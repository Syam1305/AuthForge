import crypto from 'crypto';
import { OtpChallenge, OtpPurpose, Prisma } from '@prisma/client';
import { OtpRepository } from '../repositories/otp.repository.js';
import { env } from '../config/env.js';
import {
  OtpInvalidError,
  OtpExpiredError,
  OtpMaxAttemptsError,
  OtpAlreadyUsedError,
  OtpResendCooldownError
} from '../errors/app.error.js';
import { logger } from '../utils/logger.js';

export class OtpService {
  private static readonly RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds
  private static readonly OTP_LIFETIME_MS = 10 * 60 * 1000; // 10 minutes

  /**
   * Generates a cryptographically secure 6-digit numeric OTP string with leading zeroes.
   */
  public static generateSecureOtp(): string {
    const randomInt = crypto.randomInt(0, 1000000);
    return randomInt.toString().padStart(6, '0');
  }

  /**
   * Generates a keyed HMAC-SHA256 hash for an OTP code.
   */
  public static hashCode(userId: string, purpose: OtpPurpose, code: string): string {
    return crypto
      .createHmac('sha256', env.OTP_SECRET)
      .update(`${userId}:${purpose}:${code}`)
      .digest('hex');
  }

  /**
   * Creates a new OTP challenge, enforcing resend cooldowns and invalidating older challenges.
   */
  public static async createChallenge(
    userId: string,
    purpose: OtpPurpose,
    tx?: Prisma.TransactionClient
  ): Promise<{ challenge: OtpChallenge; plainOtp: string }> {
    // 1. Check resend cooldown
    const latestChallenge = await OtpRepository.findLatestChallenge(userId, purpose, tx);
    if (latestChallenge) {
      const elapsedMs = Date.now() - latestChallenge.createdAt.getTime();
      if (elapsedMs < this.RESEND_COOLDOWN_MS) {
        const remainingSeconds = Math.ceil((this.RESEND_COOLDOWN_MS - elapsedMs) / 1000);
        logger.warn(`OTP resend blocked by cooldown for user ${userId}. Remaining: ${remainingSeconds}s`);
        throw new OtpResendCooldownError(
          `Please wait ${remainingSeconds} seconds before requesting another verification code.`
        );
      }
    }

    // 2. Invalidate any older active unconsumed challenges for this user and purpose
    await OtpRepository.invalidateActiveChallenges(userId, purpose, tx);

    // 3. Generate new 6-digit OTP and compute secure HMAC
    const plainOtp = this.generateSecureOtp();
    const codeHash = this.hashCode(userId, purpose, plainOtp);
    const expiresAt = new Date(Date.now() + this.OTP_LIFETIME_MS);

    // 4. Persist challenge record in database
    const challenge = await OtpRepository.createChallenge(
      {
        userId,
        purpose,
        codeHash,
        expiresAt,
        maxAttempts: 5
      },
      tx
    );

    logger.info(`Created ${purpose} OTP challenge for user ${userId} (Expires in 10m)`);

    return { challenge, plainOtp };
  }

  /**
   * Validates a submitted OTP against active challenges, tracking failed attempts and expiration.
   */
  public static async verifyChallenge(
    userId: string,
    purpose: OtpPurpose,
    submittedOtp: string,
    tx?: Prisma.TransactionClient
  ): Promise<OtpChallenge> {
    // 1. Retrieve the latest challenge for status checks
    const latest = await OtpRepository.findLatestChallenge(userId, purpose, tx);

    if (!latest) {
      throw new OtpInvalidError();
    }

    if (latest.consumedAt) {
      throw new OtpAlreadyUsedError();
    }

    if (latest.expiresAt <= new Date()) {
      throw new OtpExpiredError();
    }

    if (latest.attempts >= latest.maxAttempts) {
      throw new OtpMaxAttemptsError();
    }

    // 2. Validate submitted OTP code using constant-time comparison
    const expectedHash = this.hashCode(userId, purpose, submittedOtp);
    const expectedBuffer = Buffer.from(expectedHash, 'hex');
    const storedBuffer = Buffer.from(latest.codeHash, 'hex');

    const isValid =
      expectedBuffer.length === storedBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, storedBuffer);

    if (!isValid) {
      const updated = await OtpRepository.incrementAttempts(latest.id, tx);
      logger.warn(
        `Failed OTP attempt (${updated.attempts}/${updated.maxAttempts}) for user ${userId} on ${purpose}`
      );

      if (updated.attempts >= updated.maxAttempts) {
        throw new OtpMaxAttemptsError();
      }

      throw new OtpInvalidError();
    }

    return latest;
  }
}
