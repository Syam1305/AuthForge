import crypto from 'crypto';
import { OtpPurpose, SecurityEventType } from '@prisma/client';
import { prisma } from '../database/prisma.js';
import { UserRepository } from '../repositories/user.repository.js';
import { OtpRepository } from '../repositories/otp.repository.js';
import { PasswordResetRepository } from '../repositories/password-reset.repository.js';
import { OtpService } from './otp.service.js';
import { PasswordService } from './password.service.js';
import { SessionService } from './session.service.js';
import { SecurityEventService } from './security-event.service.js';
import { defaultOtpDeliveryProvider } from '../providers/otp-delivery.provider.js';
import {
  OtpInvalidError,
  ResetTokenInvalidError,
  ResetTokenExpiredError,
  ResetTokenAlreadyUsedError
} from '../errors/app.error.js';
import { logger } from '../utils/logger.js';

export class PasswordResetService {
  private static readonly RESET_TOKEN_LIFETIME_MS = 15 * 60 * 1000; // 15 minutes

  /**
   * Hashes a raw reset authorization token using SHA-256 for secure database storage.
   */
  public static hashResetToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * Handles password reset requests. Prevents account enumeration by returning
   * an identical generic success response whether the user exists or not.
   */
  public static async requestReset(email: string): Promise<{ message: string }> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await UserRepository.findByEmail(normalizedEmail);

    if (user && user.isActive) {
      try {
        const { plainOtp } = await OtpService.createChallenge(
          user.id,
          OtpPurpose.PASSWORD_RESET
        );

        await defaultOtpDeliveryProvider.sendPasswordResetCode(user.email, plainOtp);
        logger.info(`Password reset OTP dispatched for user ${user.id}`);
      } catch (error) {
        logger.error(`Error during password reset request for user ${user.id}:`, error);
        // Do not leak internal error to client, continue to return generic message
      }
    } else {
      // Execute dummy work to mitigate timing side-channels
      await PasswordService.verifyDummy('DummyPassword123');
      logger.info(`Password reset requested for non-existent or inactive email: ${normalizedEmail}`);
    }

    return {
      message: 'If an account exists for this email, a password reset code will be sent.'
    };
  }

  /**
   * Verifies the password reset OTP and exchanges it for a short-lived, single-use resetToken.
   */
  public static async verifyResetOtp(
    email: string,
    otp: string
  ): Promise<{ resetToken: string }> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await UserRepository.findByEmail(normalizedEmail);

    if (!user || !user.isActive) {
      throw new OtpInvalidError();
    }

    // Verify OTP challenge
    const challenge = await OtpService.verifyChallenge(
      user.id,
      OtpPurpose.PASSWORD_RESET,
      otp
    );

    // Generate single-use cryptographically random 32-byte reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = this.hashResetToken(resetToken);
    const expiresAt = new Date(Date.now() + this.RESET_TOKEN_LIFETIME_MS);

    // Execute atomic transaction: Consume OTP challenge and issue reset authorization
    await prisma.$transaction(async (tx) => {
      await OtpRepository.consumeChallenge(challenge.id, tx);
      await PasswordResetRepository.createAuthorization(
        {
          userId: user.id,
          tokenHash,
          expiresAt
        },
        tx
      );
    });

    logger.info(`Password reset authorization token issued for user ${user.id}`);

    return { resetToken };
  }

  /**
   * Completes the password reset by validating the resetToken, updating the password hash,
   * invalidating active OTPs, and revoking all active user sessions and refresh tokens.
   */
  public static async completePasswordReset(
    resetToken: string,
    newPassword: string
  ): Promise<{ message: string }> {
    const tokenHash = this.hashResetToken(resetToken);
    const authorization = await PasswordResetRepository.findByTokenHash(tokenHash);

    if (!authorization) {
      throw new ResetTokenInvalidError();
    }

    if (authorization.consumedAt) {
      throw new ResetTokenAlreadyUsedError();
    }

    if (authorization.expiresAt <= new Date()) {
      throw new ResetTokenExpiredError();
    }

    // Compute secure Argon2id hash for new password
    const newPasswordHash = await PasswordService.hashPassword(newPassword);

    // Execute atomic transaction to update password, consume token, invalidate OTPs, and revoke all sessions
    await prisma.$transaction(async (tx) => {
      await PasswordResetRepository.consumeAuthorization(authorization.id, tx);
      await UserRepository.updatePassword(authorization.userId, newPasswordHash, tx);
      await OtpRepository.invalidateActiveChallenges(
        authorization.userId,
        OtpPurpose.PASSWORD_RESET,
        tx
      );
      // Phase 4 & 5 Requirement: Revoke all existing sessions and refresh tokens on password reset
      await SessionService.revokeAllSessions(authorization.userId, 'PASSWORD_RESET', tx);
    });

    // Record PASSWORD_RESET security event
    await SecurityEventService.recordEvent({
      userId: authorization.userId,
      type: SecurityEventType.PASSWORD_RESET,
      metadata: { status: 'success' }
    });

    logger.info(`Password successfully updated and all sessions revoked for user ${authorization.userId}`);

    return {
      message: 'Password has been successfully reset.'
    };
  }
}

