import { User, OtpPurpose, SecurityEventType } from '@prisma/client';
import { prisma } from '../database/prisma.js';
import { env } from '../config/env.js';
import { UserRepository } from '../repositories/user.repository.js';
import { SessionRepository } from '../repositories/session.repository.js';
import { OtpRepository } from '../repositories/otp.repository.js';
import { PasswordService } from './password.service.js';
import { OtpService } from './otp.service.js';
import { SessionService } from './session.service.js';
import { SecurityEventService } from './security-event.service.js';
import { defaultOtpDeliveryProvider } from '../providers/otp-delivery.provider.js';
import { defaultSmsDeliveryProvider } from '../providers/sms-delivery.provider.js';
import { PhoneUtil } from '../utils/phone.js';
import {
  RegisterInput,
  PhoneRegisterInput,
  LoginInput,
  PhonePasswordLoginInput,
  ChangePasswordInput
} from '../validation/auth.validation.js';
import {
  ConflictError,
  AuthenticationError,
  ForbiddenError,
  NotFoundError,
  OtpInvalidError,
  OtpAlreadyUsedError,
  EmailAlreadyVerifiedError,
  CurrentPasswordInvalidError,
  PasswordSameAsCurrentError,
  AccountLockedError
} from '../errors/app.error.js';
import { logger } from '../utils/logger.js';

export interface PublicUser {
  id: string;
  email: string | null;
  phoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  isActive: boolean;
  emailVerifiedAt: Date | null;
  phoneNumberVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResult {
  user: PublicUser;
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
}

export interface SecurityStatusResult {
  email: string | null;
  emailVerified: boolean;
  emailVerifiedAt: Date | null;
  phoneNumber: string | null;
  phoneVerified: boolean;
  phoneNumberVerifiedAt: Date | null;
  activeSessions: number;
  passwordUpdatedAt: Date;
  accountLocked: boolean;
  lockedUntil: Date | null;
  failedLoginAttempts: number;
}

export class UserService {
  /**
   * Sanitizes a User model entity into a safe representation.
   * Guaranteed never to include password, passwordHash, or internal secrets.
   */
  public static toPublicUser(user: User): PublicUser {
    return {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      emailVerifiedAt: user.emailVerifiedAt,
      phoneNumberVerifiedAt: user.phoneNumberVerifiedAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  /**
   * Normalizes an email address consistently (trims whitespace, converts to lowercase).
   */
  public static normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  /**
   * Normalizes a phone number into canonical E.164 format (e.g. "+919876543210").
   */
  public static normalizePhoneNumber(phone: string): string {
    return PhoneUtil.normalize(phone);
  }

  /**
   * Registers a new user account with Email and initiates email verification challenge.
   */
  public static async register(
    input: RegisterInput,
    metadata?: { ipAddress?: string | null; userAgent?: string | null }
  ): Promise<PublicUser> {
    const normalizedEmail = this.normalizeEmail(input.email);

    // 1. Check for existing user with identical normalized email
    const existingUser = await UserRepository.findByEmail(normalizedEmail);
    if (existingUser) {
      throw new ConflictError('An account with this email already exists.');
    }

    // 2. Hash password securely using Argon2id
    const passwordHash = await PasswordService.hashPassword(input.password);

    // 3. Create user and dispatch initial verification OTP
    const { newUser, plainOtp } = await prisma.$transaction(async (tx) => {
      const user = await UserRepository.create(
        {
          email: normalizedEmail,
          passwordHash,
          firstName: input.firstName || null,
          lastName: input.lastName || null,
          isActive: true,
          emailVerifiedAt: null
        },
        tx
      );

      const challengeResult = await OtpService.createChallenge(
        user.id,
        OtpPurpose.EMAIL_VERIFICATION,
        tx
      );

      return { newUser: user, plainOtp: challengeResult.plainOtp };
    });

    // 4. Record REGISTER security event
    await SecurityEventService.recordEvent({
      userId: newUser.id,
      type: SecurityEventType.REGISTER,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      metadata: { method: 'email_password' }
    });

    // 5. Deliver verification OTP via provider
    if (newUser.email) {
      await defaultOtpDeliveryProvider.sendVerificationCode(newUser.email, plainOtp);
    }
    logger.info(`User registered and email verification code dispatched for user ID: ${newUser.id}`);

    return this.toPublicUser(newUser);
  }

  /**
   * Registers a new user account with Phone Number and initiates SMS verification challenge.
   */
  public static async registerWithPhone(
    input: PhoneRegisterInput,
    metadata?: { ipAddress?: string | null; userAgent?: string | null }
  ): Promise<PublicUser> {
    const normalizedPhone = this.normalizePhoneNumber(input.phoneNumber);

    // 1. Check for existing user with identical normalized phone number
    const existingUser = await UserRepository.findByPhoneNumber(normalizedPhone);
    if (existingUser) {
      throw new ConflictError('An account with this phone number already exists.');
    }

    // 2. Hash password if provided
    let passwordHash: string | null = null;
    if (input.password && input.password.trim().length > 0) {
      passwordHash = await PasswordService.hashPassword(input.password);
    }

    // 3. Create user and dispatch initial phone verification OTP
    const { newUser, plainOtp } = await prisma.$transaction(async (tx) => {
      const user = await UserRepository.create(
        {
          phoneNumber: normalizedPhone,
          passwordHash,
          firstName: input.firstName || null,
          lastName: input.lastName || null,
          isActive: true,
          phoneNumberVerifiedAt: null
        },
        tx
      );

      const challengeResult = await OtpService.createChallenge(
        user.id,
        OtpPurpose.PHONE_VERIFICATION,
        tx
      );

      return { newUser: user, plainOtp: challengeResult.plainOtp };
    });

    // 4. Record REGISTER security event
    await SecurityEventService.recordEvent({
      userId: newUser.id,
      type: SecurityEventType.REGISTER,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      metadata: { method: 'phone', hasPassword: Boolean(passwordHash) }
    });

    // 5. Deliver verification OTP via SMS provider
    if (newUser.phoneNumber) {
      await defaultSmsDeliveryProvider.sendVerificationCode(newUser.phoneNumber, plainOtp);
    }
    logger.info(`User registered and phone verification code dispatched for user ID: ${newUser.id}`);

    return this.toPublicUser(newUser);
  }

  /**
   * Authenticates user credentials (Email + Password) with brute-force lockout protection.
   */
  public static async login(
    input: LoginInput,
    metadata?: { ipAddress?: string | null; userAgent?: string | null }
  ): Promise<LoginResult> {
    const normalizedEmail = this.normalizeEmail(input.email);

    // 1. Find user by email
    const user = await UserRepository.findByEmail(normalizedEmail);

    // If user is not found or has no password, execute dummy hashing to equalize execution time
    if (!user || !user.passwordHash) {
      await PasswordService.verifyDummy(input.password);
      await SecurityEventService.recordEvent({
        userId: null,
        type: SecurityEventType.LOGIN_FAILURE,
        ipAddress: metadata?.ipAddress,
        userAgent: metadata?.userAgent,
        metadata: { email: normalizedEmail, reason: 'user_not_found' }
      });
      throw new AuthenticationError('Invalid email or password.');
    }

    // 2. Check if account is active
    if (!user.isActive) {
      throw new ForbiddenError('This account is inactive.', 'ACCOUNT_INACTIVE');
    }

    const now = new Date();

    // 3. Check temporary account lockout state
    if (user.lockedUntil && user.lockedUntil > now) {
      const remainingSeconds = Math.ceil((user.lockedUntil.getTime() - now.getTime()) / 1000);
      logger.warn(
        `Login attempt rejected for locked user ${user.id}. Lock expires in ${remainingSeconds}s`
      );

      await SecurityEventService.recordEvent({
        userId: user.id,
        type: SecurityEventType.LOGIN_FAILURE,
        ipAddress: metadata?.ipAddress,
        userAgent: metadata?.userAgent,
        metadata: { reason: 'account_locked', remainingSeconds }
      });

      throw new AccountLockedError();
    }

    // 4. Verify password against stored Argon2id hash
    const isPasswordValid = await PasswordService.verifyPassword(input.password, user.passwordHash);

    if (!isPasswordValid) {
      // Atomic counter increment
      const updatedUser = await UserRepository.incrementFailedLoginAttempts(user.id);
      const failedAttempts = updatedUser.failedLoginAttempts;

      logger.warn(
        `Failed login attempt (${failedAttempts}/${env.LOGIN_MAX_FAILED_ATTEMPTS}) for user ${user.id}`
      );

      // Check if lockout threshold reached
      if (failedAttempts >= env.LOGIN_MAX_FAILED_ATTEMPTS) {
        const lockedUntil = new Date(Date.now() + env.LOGIN_LOCKOUT_MINUTES * 60 * 1000);
        await UserRepository.lockAccount(user.id, lockedUntil);

        logger.error(
          `SECURITY: User ${user.id} temporarily locked until ${lockedUntil.toISOString()} due to ${failedAttempts} failed attempts.`
        );

        await SecurityEventService.recordEvent({
          userId: user.id,
          type: SecurityEventType.ACCOUNT_LOCKED,
          ipAddress: metadata?.ipAddress,
          userAgent: metadata?.userAgent,
          metadata: { failedAttempts, lockoutMinutes: env.LOGIN_LOCKOUT_MINUTES }
        });
      }

      await SecurityEventService.recordEvent({
        userId: user.id,
        type: SecurityEventType.LOGIN_FAILURE,
        ipAddress: metadata?.ipAddress,
        userAgent: metadata?.userAgent,
        metadata: { failedAttempts, reason: 'invalid_password' }
      });

      throw new AuthenticationError('Invalid email or password.');
    }

    // 5. Successful login: Reset failed attempts & clear lockout
    if (user.failedLoginAttempts > 0 || user.lockedUntil !== null) {
      await UserRepository.resetFailedAttempts(user.id);
      if (user.lockedUntil && user.lockedUntil <= now) {
        await SecurityEventService.recordEvent({
          userId: user.id,
          type: SecurityEventType.ACCOUNT_UNLOCKED,
          ipAddress: metadata?.ipAddress,
          userAgent: metadata?.userAgent,
          metadata: { reason: 'successful_login' }
        });
      }
    }

    // 6. Create authentication session and tokens
    const { session, tokens } = await SessionService.createSession(user.id, metadata);

    // 7. Record LOGIN_SUCCESS security event
    await SecurityEventService.recordEvent({
      userId: user.id,
      type: SecurityEventType.LOGIN_SUCCESS,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      metadata: { sessionId: session.id, method: 'email_password' }
    });

    logger.info(`User login successful for user ID: ${user.id}, created session ID: ${session.id}`);

    return {
      user: this.toPublicUser(user),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      tokenType: 'Bearer',
      expiresIn: tokens.expiresIn
    };
  }

  /**
   * Authenticates user with Phone Number + Password.
   */
  public static async loginWithPhone(
    input: PhonePasswordLoginInput,
    metadata?: { ipAddress?: string | null; userAgent?: string | null }
  ): Promise<LoginResult> {
    const normalizedPhone = this.normalizePhoneNumber(input.phoneNumber);
    const user = await UserRepository.findByPhoneNumber(normalizedPhone);

    if (!user || !user.passwordHash) {
      await PasswordService.verifyDummy(input.password);
      await SecurityEventService.recordEvent({
        userId: null,
        type: SecurityEventType.PHONE_LOGIN_FAILURE,
        ipAddress: metadata?.ipAddress,
        userAgent: metadata?.userAgent,
        metadata: { phone: normalizedPhone, reason: 'user_or_password_not_found' }
      });
      throw new AuthenticationError('Invalid phone number or password.');
    }

    if (!user.isActive) {
      throw new ForbiddenError('This account is inactive.', 'ACCOUNT_INACTIVE');
    }

    const now = new Date();
    if (user.lockedUntil && user.lockedUntil > now) {
      const remainingSeconds = Math.ceil((user.lockedUntil.getTime() - now.getTime()) / 1000);
      throw new AccountLockedError();
    }

    const isPasswordValid = await PasswordService.verifyPassword(input.password, user.passwordHash);
    if (!isPasswordValid) {
      const updatedUser = await UserRepository.incrementFailedLoginAttempts(user.id);
      if (updatedUser.failedLoginAttempts >= env.LOGIN_MAX_FAILED_ATTEMPTS) {
        const lockedUntil = new Date(Date.now() + env.LOGIN_LOCKOUT_MINUTES * 60 * 1000);
        await UserRepository.lockAccount(user.id, lockedUntil);
      }
      throw new AuthenticationError('Invalid phone number or password.');
    }

    if (user.failedLoginAttempts > 0 || user.lockedUntil !== null) {
      await UserRepository.resetFailedAttempts(user.id);
    }

    const { session, tokens } = await SessionService.createSession(user.id, metadata);

    await SecurityEventService.recordEvent({
      userId: user.id,
      type: SecurityEventType.PHONE_LOGIN_SUCCESS,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      metadata: { sessionId: session.id, method: 'phone_password' }
    });

    return {
      user: this.toPublicUser(user),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      tokenType: 'Bearer',
      expiresIn: tokens.expiresIn
    };
  }

  /**
   * Passwordless Phone Login: Requests a 6-digit OTP code to the provided phone number.
   * Enumeration-safe: always returns generic success.
   */
  public static async requestPhoneLogin(phoneNumber: string): Promise<{ message: string }> {
    const normalizedPhone = this.normalizePhoneNumber(phoneNumber);
    const user = await UserRepository.findByPhoneNumber(normalizedPhone);

    if (user && user.isActive) {
      try {
        const { plainOtp } = await OtpService.createChallenge(
          user.id,
          OtpPurpose.PHONE_LOGIN
        );

        await defaultSmsDeliveryProvider.sendLoginCode(normalizedPhone, plainOtp);

        await SecurityEventService.recordEvent({
          userId: user.id,
          type: SecurityEventType.PHONE_OTP_REQUESTED,
          metadata: { purpose: 'PHONE_LOGIN' }
        });

        logger.info(`Phone login OTP dispatched for user ${user.id}`);
      } catch (error) {
        logger.error(`Error during phone login OTP dispatch for user ${user.id}:`, error);
      }
    } else {
      await PasswordService.verifyDummy('DummyPhoneTiming123');
      logger.info(`Phone login requested for non-existent or inactive phone: ${normalizedPhone}`);
    }

    return {
      message: 'If an account exists for this phone number, a verification code has been sent.'
    };
  }

  /**
   * Passwordless Phone Login: Verifies the 6-digit OTP and establishes an authenticated session.
   */
  public static async verifyPhoneLogin(
    phoneNumber: string,
    otp: string,
    metadata?: { ipAddress?: string | null; userAgent?: string | null }
  ): Promise<LoginResult> {
    const normalizedPhone = this.normalizePhoneNumber(phoneNumber);
    const user = await UserRepository.findByPhoneNumber(normalizedPhone);

    if (!user || !user.isActive) {
      throw new OtpInvalidError();
    }

    // Verify OTP challenge
    const challenge = await OtpService.verifyChallenge(
      user.id,
      OtpPurpose.PHONE_LOGIN,
      otp
    );

    // Atomically consume challenge and mark phone verified if not already verified
    await prisma.$transaction(async (tx) => {
      const consumed = await OtpRepository.consumeChallenge(challenge.id, tx);
      if (!consumed) {
        throw new OtpAlreadyUsedError();
      }
      if (!user.phoneNumberVerifiedAt) {
        await UserRepository.markPhoneVerified(user.id, new Date(), tx);
      }
    });

    // Create session & tokens
    const { session, tokens } = await SessionService.createSession(user.id, metadata);

    // Record PHONE_LOGIN_SUCCESS
    await SecurityEventService.recordEvent({
      userId: user.id,
      type: SecurityEventType.PHONE_LOGIN_SUCCESS,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      metadata: { sessionId: session.id, method: 'phone_otp' }
    });

    logger.info(`Phone OTP login successful for user ID: ${user.id}`);

    return {
      user: this.toPublicUser(user),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      tokenType: 'Bearer',
      expiresIn: tokens.expiresIn
    };
  }

  /**
   * Verifies a user's phone number using a submitted OTP code.
   */
  public static async verifyPhone(
    phoneNumber: string,
    otp: string,
    metadata?: { ipAddress?: string | null; userAgent?: string | null }
  ): Promise<{ verified: boolean }> {
    const normalizedPhone = this.normalizePhoneNumber(phoneNumber);
    const user = await UserRepository.findByPhoneNumber(normalizedPhone);

    if (!user || !user.isActive) {
      throw new OtpInvalidError();
    }

    const challenge = await OtpService.verifyChallenge(
      user.id,
      OtpPurpose.PHONE_VERIFICATION,
      otp
    );

    await prisma.$transaction(async (tx) => {
      const consumed = await OtpRepository.consumeChallenge(challenge.id, tx);
      if (!consumed) {
        throw new OtpAlreadyUsedError();
      }
      await UserRepository.markPhoneVerified(user.id, new Date(), tx);
    });

    await SecurityEventService.recordEvent({
      userId: user.id,
      type: SecurityEventType.PHONE_VERIFIED,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent
    });

    logger.info(`Phone number successfully verified for user ID: ${user.id}`);

    return { verified: true };
  }

  /**
   * Resends a phone verification OTP with cooldown enforcement.
   */
  public static async resendPhoneVerificationOtp(phoneNumber: string): Promise<{ message: string }> {
    const normalizedPhone = this.normalizePhoneNumber(phoneNumber);
    const user = await UserRepository.findByPhoneNumber(normalizedPhone);

    if (!user || !user.isActive) {
      throw new NotFoundError('User account not found.');
    }

    const { plainOtp } = await OtpService.createChallenge(
      user.id,
      OtpPurpose.PHONE_VERIFICATION
    );

    await defaultSmsDeliveryProvider.sendVerificationCode(normalizedPhone, plainOtp);

    await SecurityEventService.recordEvent({
      userId: user.id,
      type: SecurityEventType.PHONE_OTP_RESENT,
      metadata: { purpose: 'PHONE_VERIFICATION' }
    });

    logger.info(`Phone verification code resent for user ID: ${user.id}`);

    return {
      message: 'Verification code resent successfully.'
    };
  }

  /**
   * Authenticated user requests a phone number change.
   * Generates a PHONE_VERIFICATION OTP sent to the proposed new phone number.
   */
  public static async requestPhoneChange(
    userId: string,
    newPhoneNumber: string
  ): Promise<{ message: string }> {
    const user = await UserRepository.findById(userId);
    if (!user || !user.isActive) {
      throw new NotFoundError('User not found.');
    }

    const normalizedNewPhone = this.normalizePhoneNumber(newPhoneNumber);

    // Check if new phone is already taken by another account
    const existing = await UserRepository.findByPhoneNumber(normalizedNewPhone);
    if (existing && existing.id !== user.id) {
      throw new ConflictError('This phone number is already registered to another account.');
    }

    const { plainOtp } = await OtpService.createChallenge(
      user.id,
      OtpPurpose.PHONE_VERIFICATION
    );

    await defaultSmsDeliveryProvider.sendVerificationCode(normalizedNewPhone, plainOtp);
    logger.info(`Phone change verification code dispatched for user ID: ${user.id}`);

    return {
      message: 'Verification code has been sent to the new phone number.'
    };
  }

  /**
   * Authenticated user verifies and commits the phone number change.
   */
  public static async verifyPhoneChange(
    userId: string,
    newPhoneNumber: string,
    otp: string,
    metadata?: { ipAddress?: string | null; userAgent?: string | null }
  ): Promise<{ message: string }> {
    const user = await UserRepository.findById(userId);
    if (!user || !user.isActive) {
      throw new NotFoundError('User not found.');
    }

    const normalizedNewPhone = this.normalizePhoneNumber(newPhoneNumber);

    const existing = await UserRepository.findByPhoneNumber(normalizedNewPhone);
    if (existing && existing.id !== user.id) {
      throw new ConflictError('This phone number is already registered to another account.');
    }

    const challenge = await OtpService.verifyChallenge(
      user.id,
      OtpPurpose.PHONE_VERIFICATION,
      otp
    );

    await prisma.$transaction(async (tx) => {
      const consumed = await OtpRepository.consumeChallenge(challenge.id, tx);
      if (!consumed) {
        throw new OtpAlreadyUsedError();
      }
      await UserRepository.updatePhoneNumber(user.id, normalizedNewPhone, new Date(), tx);
    });

    await SecurityEventService.recordEvent({
      userId: user.id,
      type: SecurityEventType.PHONE_NUMBER_CHANGED,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      metadata: { newPhoneNumber: normalizedNewPhone }
    });

    logger.info(`Phone number successfully changed and verified for user ID: ${user.id}`);

    return {
      message: 'Phone number has been updated and verified successfully.'
    };
  }

  /**
   * Changes a user's password, atomically revoking all active sessions and refresh tokens.
   */
  public static async changePassword(
    userId: string,
    input: ChangePasswordInput,
    metadata?: { ipAddress?: string | null; userAgent?: string | null }
  ): Promise<{ message: string }> {
    const user = await UserRepository.findById(userId);

    if (!user || !user.isActive) {
      throw new NotFoundError('User not found.');
    }

    // 1. Verify current password
    if (!user.passwordHash) {
      // User registered passwordless; allow setting first password
    } else {
      const isCurrentPasswordValid = await PasswordService.verifyPassword(
        input.currentPassword,
        user.passwordHash
      );

      if (!isCurrentPasswordValid) {
        await SecurityEventService.recordEvent({
          userId: user.id,
          type: SecurityEventType.PASSWORD_CHANGED,
          ipAddress: metadata?.ipAddress,
          userAgent: metadata?.userAgent,
          metadata: { status: 'failed', reason: 'current_password_invalid' }
        });
        throw new CurrentPasswordInvalidError();
      }

      // 2. Ensure new password differs from current password
      if (input.currentPassword === input.newPassword) {
        throw new PasswordSameAsCurrentError();
      }
    }

    // 3. Hash new password with Argon2id
    const newPasswordHash = await PasswordService.hashPassword(input.newPassword);

    // 4. Execute atomic transaction: Update password hash & revoke all sessions
    await prisma.$transaction(async (tx) => {
      await UserRepository.updatePassword(user.id, newPasswordHash, tx);
      await SessionService.revokeAllSessions(user.id, 'PASSWORD_CHANGED', tx, metadata);
    });

    // 5. Record PASSWORD_CHANGED security event
    await SecurityEventService.recordEvent({
      userId: user.id,
      type: SecurityEventType.PASSWORD_CHANGED,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      metadata: { status: 'success' }
    });

    logger.info(`Password successfully changed and all sessions revoked for user ${user.id}`);

    return {
      message: 'Password changed successfully. All active sessions have been logged out.'
    };
  }

  /**
   * Retrieves security status metadata for an authenticated user.
   */
  public static async getSecurityStatus(userId: string): Promise<SecurityStatusResult> {
    const user = await UserRepository.findById(userId);

    if (!user || !user.isActive) {
      throw new NotFoundError('User not found.');
    }

    const activeSessions = await SessionRepository.countActiveByUserId(user.id);
    const now = new Date();
    const isLocked = user.lockedUntil !== null && user.lockedUntil > now;

    return {
      email: user.email,
      emailVerified: user.emailVerifiedAt !== null,
      emailVerifiedAt: user.emailVerifiedAt,
      phoneNumber: user.phoneNumber,
      phoneVerified: user.phoneNumberVerifiedAt !== null,
      phoneNumberVerifiedAt: user.phoneNumberVerifiedAt,
      activeSessions,
      passwordUpdatedAt: user.passwordUpdatedAt,
      accountLocked: isLocked,
      lockedUntil: isLocked ? user.lockedUntil : null,
      failedLoginAttempts: user.failedLoginAttempts
    };
  }

  /**
   * Verifies a user's email using a submitted OTP code.
   */
  public static async verifyEmail(
    email: string,
    otp: string,
    metadata?: { ipAddress?: string | null; userAgent?: string | null }
  ): Promise<{ verified: boolean }> {
    const normalizedEmail = this.normalizeEmail(email);
    const user = await UserRepository.findByEmail(normalizedEmail);

    if (!user || !user.isActive) {
      throw new OtpInvalidError();
    }

    if (user.emailVerifiedAt) {
      throw new EmailAlreadyVerifiedError();
    }

    // Validate OTP challenge
    const challenge = await OtpService.verifyChallenge(
      user.id,
      OtpPurpose.EMAIL_VERIFICATION,
      otp
    );

    // Atomically consume challenge and mark email verified
    await prisma.$transaction(async (tx) => {
      const consumed = await OtpRepository.consumeChallenge(challenge.id, tx);
      if (!consumed) {
        throw new OtpAlreadyUsedError();
      }
      await UserRepository.markEmailVerified(user.id, new Date(), tx);
    });

    // Record EMAIL_VERIFIED security event
    await SecurityEventService.recordEvent({
      userId: user.id,
      type: SecurityEventType.EMAIL_VERIFIED,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent
    });

    logger.info(`Email successfully verified for user ID: ${user.id}`);

    return { verified: true };
  }

  /**
   * Resends an email verification OTP with cooldown enforcement.
   */
  public static async resendVerificationOtp(email: string): Promise<{ message: string }> {
    const normalizedEmail = this.normalizeEmail(email);
    const user = await UserRepository.findByEmail(normalizedEmail);

    if (!user || !user.isActive) {
      throw new NotFoundError('User account not found.');
    }

    if (user.emailVerifiedAt) {
      throw new EmailAlreadyVerifiedError();
    }

    const { plainOtp } = await OtpService.createChallenge(
      user.id,
      OtpPurpose.EMAIL_VERIFICATION
    );

    if (user.email) {
      await defaultOtpDeliveryProvider.sendVerificationCode(user.email, plainOtp);
    }
    logger.info(`Verification code resent for user ID: ${user.id}`);

    return {
      message: 'Verification code resent successfully.'
    };
  }

  /**
   * Looks up a user by ID and returns safe public representation.
   */
  public static async findById(id: string): Promise<PublicUser | null> {
    const user = await UserRepository.findById(id);
    return user ? this.toPublicUser(user) : null;
  }
}
