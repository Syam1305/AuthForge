import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { AuthProvider, SecurityEventType, Prisma, User } from '@prisma/client';
import { env } from '../config/env.js';
import { prisma } from '../database/prisma.js';
import { UserRepository } from '../repositories/user.repository.js';
import { IdentityRepository } from '../repositories/identity.repository.js';
import { SessionService } from './session.service.js';
import { SecurityEventService } from './security-event.service.js';
import { UserService, LoginResult } from './user.service.js';
import {
  AuthenticationError,
  ConflictError,
  ForbiddenError,
  AccountLockedError,
  NotFoundError,
  ServiceUnavailableError
} from '../errors/app.error.js';
import { logger } from '../utils/logger.js';

export interface VerifiedGoogleProfile {
  sub: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  givenName?: string;
  familyName?: string;
  picture?: string;
}

export type GoogleTokenVerifier = (idToken: string, audience: string) => Promise<VerifiedGoogleProfile>;

/**
 * Default Google ID Token verifier using the official google-auth-library OAuth2Client.
 */
export const defaultGoogleTokenVerifier: GoogleTokenVerifier = async (
  idToken: string,
  audience: string
): Promise<VerifiedGoogleProfile> => {
  const client = new OAuth2Client(audience);

  let ticket;
  try {
    ticket = await client.verifyIdToken({
      idToken,
      audience
    });
  } catch (error: any) {
    logger.warn('Google ID token cryptographic verification failed:', error?.message || error);
    throw new AuthenticationError('Invalid Google credential.');
  }

  const payload: TokenPayload | undefined = ticket.getPayload();
  if (!payload) {
    throw new AuthenticationError('Invalid Google credential.');
  }

  // 1. Validate Subject (sub)
  if (!payload.sub || typeof payload.sub !== 'string' || payload.sub.trim().length === 0) {
    throw new AuthenticationError('Invalid Google credential: missing subject claim.');
  }

  // 2. Validate Issuer
  const validIssuers = ['accounts.google.com', 'https://accounts.google.com'];
  if (!payload.iss || !validIssuers.includes(payload.iss)) {
    throw new AuthenticationError('Invalid Google credential: invalid issuer.');
  }

  // 3. Validate Audience
  const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!aud.includes(audience)) {
    throw new AuthenticationError('Invalid Google credential: audience mismatch.');
  }

  // 4. Validate Expiration
  const nowInSeconds = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < nowInSeconds) {
    throw new AuthenticationError('Invalid Google credential: token has expired.');
  }

  // 5. Validate Email claim
  if (!payload.email || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    throw new AuthenticationError('Invalid Google credential: email claim required.');
  }

  return {
    sub: payload.sub,
    email: payload.email,
    emailVerified: Boolean(payload.email_verified),
    name: payload.name,
    givenName: payload.given_name,
    familyName: payload.family_name,
    picture: payload.picture
  };
};

export class GoogleAuthService {
  private static tokenVerifier: GoogleTokenVerifier = defaultGoogleTokenVerifier;

  /**
   * Sets a custom token verifier (used for deterministic unit testing without external Google network calls).
   */
  public static setTokenVerifier(verifier: GoogleTokenVerifier): void {
    this.tokenVerifier = verifier;
  }

  /**
   * Resets the token verifier back to the production default.
   */
  public static resetTokenVerifier(): void {
    this.tokenVerifier = defaultGoogleTokenVerifier;
  }

  /**
   * Verifies Google ID token against the configured Google Client ID.
   */
  public static async verifyIdToken(credential: string): Promise<VerifiedGoogleProfile> {
    if (!env.GOOGLE_CLIENT_ID || env.GOOGLE_CLIENT_ID.trim() === '') {
      throw new ServiceUnavailableError('Google authentication is not configured on this server.');
    }

    return this.tokenVerifier(credential, env.GOOGLE_CLIENT_ID);
  }

  /**
   * Authenticates a user using a Google ID token ("Continue with Google").
   * Handles first-time registration, existing identity resolution, account restrictions,
   * account takeover prevention, and session generation.
   */
  public static async authenticateWithGoogle(
    credential: string,
    metadata?: { ipAddress?: string | null; userAgent?: string | null }
  ): Promise<LoginResult> {
    // 1. Verify Google authentication is enabled
    if (!env.GOOGLE_AUTH_ENABLED) {
      throw new ServiceUnavailableError('Google authentication is currently disabled on this server.');
    }

    // 2. Validate Google credential
    const profile = await this.verifyIdToken(credential);

    // 3. Enforce verified email requirement
    if (!profile.emailVerified) {
      await SecurityEventService.recordEvent({
        userId: null,
        type: SecurityEventType.GOOGLE_LOGIN_FAILURE,
        ipAddress: metadata?.ipAddress,
        userAgent: metadata?.userAgent,
        metadata: { provider: 'GOOGLE', reason: 'email_not_verified' }
      });
      throw new AuthenticationError('Google account email must be verified to authenticate.');
    }

    const normalizedEmail = UserService.normalizeEmail(profile.email);

    // 4. Lookup existing AuthIdentity for (GOOGLE, sub)
    const existingIdentity = await IdentityRepository.findByProviderSubject(
      AuthProvider.GOOGLE,
      profile.sub
    );

    if (existingIdentity) {
      const user = existingIdentity.user;

      // 4A. Check if account is active
      if (!user.isActive) {
        await SecurityEventService.recordEvent({
          userId: user.id,
          type: SecurityEventType.GOOGLE_LOGIN_FAILURE,
          ipAddress: metadata?.ipAddress,
          userAgent: metadata?.userAgent,
          metadata: { provider: 'GOOGLE', reason: 'account_inactive' }
        });
        throw new ForbiddenError('This account is inactive.', 'ACCOUNT_INACTIVE');
      }

      // 4B. Check if account is locked
      const now = new Date();
      if (user.lockedUntil && user.lockedUntil > now) {
        const remainingSeconds = Math.ceil((user.lockedUntil.getTime() - now.getTime()) / 1000);
        await SecurityEventService.recordEvent({
          userId: user.id,
          type: SecurityEventType.GOOGLE_LOGIN_FAILURE,
          ipAddress: metadata?.ipAddress,
          userAgent: metadata?.userAgent,
          metadata: { provider: 'GOOGLE', reason: 'account_locked', remainingSeconds }
        });
        throw new AccountLockedError();
      }

      // 4C. Reset any failed password attempts on successful Google OAuth login
      if (user.failedLoginAttempts > 0 || user.lockedUntil !== null) {
        await UserRepository.resetFailedAttempts(user.id);
      }

      // 4D. Create AuthForge session
      const { session, tokens } = await SessionService.createSession(user.id, metadata);

      // 4E. Record GOOGLE_LOGIN_SUCCESS event
      await SecurityEventService.recordEvent({
        userId: user.id,
        type: SecurityEventType.GOOGLE_LOGIN_SUCCESS,
        ipAddress: metadata?.ipAddress,
        userAgent: metadata?.userAgent,
        metadata: { provider: 'GOOGLE', sessionId: session.id, isNewUser: false }
      });

      logger.info(`Google login successful for user ID: ${user.id}, session ID: ${session.id}`);

      return {
        user: UserService.toPublicUser(user),
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        tokenType: 'Bearer',
        expiresIn: tokens.expiresIn
      };
    }

    // 5. Google identity does not exist. Check if an AuthForge account with the same email exists.
    const existingUserWithEmail = await UserRepository.findByEmail(normalizedEmail);

    if (existingUserWithEmail) {
      // 5A. ACCOUNT TAKEOVER PREVENTION:
      // An account exists with this email, but this Google identity is not linked to it.
      // Do NOT silently merge accounts. Require explicit authenticated linking.
      logger.warn(
        `Google login rejected: Account exists for ${normalizedEmail} but Google identity ${profile.sub} is unlinked.`
      );

      await SecurityEventService.recordEvent({
        userId: existingUserWithEmail.id,
        type: SecurityEventType.GOOGLE_LOGIN_FAILURE,
        ipAddress: metadata?.ipAddress,
        userAgent: metadata?.userAgent,
        metadata: {
          provider: 'GOOGLE',
          reason: 'unlinked_existing_account',
          email: normalizedEmail
        }
      });

      throw new ConflictError(
        'An account with this email already exists. Please log in with your password and link your Google account in security settings.',
        'GOOGLE_LINK_REQUIRED'
      );
    }

    // 6. First-time Google user creation (Atomic transaction with unique constraint race handling)
    try {
      const { newUser, session, tokens } = await prisma.$transaction(async (tx) => {
        // 6A. Create User entity with verified email and no password
        const user = await UserRepository.create(
          {
            email: normalizedEmail,
            passwordHash: null,
            firstName: profile.givenName || profile.name || null,
            lastName: profile.familyName || null,
            isActive: true,
            emailVerifiedAt: new Date()
          },
          tx
        );

        // 6B. Create AuthIdentity mapping
        await IdentityRepository.create(
          {
            user: { connect: { id: user.id } },
            provider: AuthProvider.GOOGLE,
            providerSubject: profile.sub,
            email: normalizedEmail
          },
          tx
        );

        // 6C. Create initial session
        const sessionResult = await SessionService.createSession(user.id, metadata, tx);

        return {
          newUser: user,
          session: sessionResult.session,
          tokens: sessionResult.tokens
        };
      });

      // 6D. Record security audit events
      await SecurityEventService.recordEvent({
        userId: newUser.id,
        type: SecurityEventType.GOOGLE_IDENTITY_CREATED,
        ipAddress: metadata?.ipAddress,
        userAgent: metadata?.userAgent,
        metadata: { provider: 'GOOGLE' }
      });

      await SecurityEventService.recordEvent({
        userId: newUser.id,
        type: SecurityEventType.GOOGLE_LOGIN_SUCCESS,
        ipAddress: metadata?.ipAddress,
        userAgent: metadata?.userAgent,
        metadata: { provider: 'GOOGLE', sessionId: session.id, isNewUser: true }
      });

      logger.info(`New user created via Google Sign-In: ID ${newUser.id}, session ID: ${session.id}`);

      return {
        user: UserService.toPublicUser(newUser),
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        tokenType: 'Bearer',
        expiresIn: tokens.expiresIn
      };
    } catch (error: any) {
      // Handle race condition: Concurrent first-time Google logins for the same sub
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        logger.warn(`Handled concurrent Google login race condition for subject: ${profile.sub}`);
        const resolvedIdentity = await IdentityRepository.findByProviderSubject(
          AuthProvider.GOOGLE,
          profile.sub
        );
        if (resolvedIdentity) {
          const user = resolvedIdentity.user;
          const { session, tokens } = await SessionService.createSession(user.id, metadata);

          await SecurityEventService.recordEvent({
            userId: user.id,
            type: SecurityEventType.GOOGLE_LOGIN_SUCCESS,
            ipAddress: metadata?.ipAddress,
            userAgent: metadata?.userAgent,
            metadata: { provider: 'GOOGLE', sessionId: session.id, isNewUser: false }
          });

          return {
            user: UserService.toPublicUser(user),
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            tokenType: 'Bearer',
            expiresIn: tokens.expiresIn
          };
        }
      }
      throw error;
    }
  }

  /**
   * Explicitly links a Google Identity to an existing authenticated AuthForge user.
   */
  public static async linkGoogleIdentity(
    userId: string,
    credential: string,
    metadata?: { ipAddress?: string | null; userAgent?: string | null }
  ): Promise<{ message: string }> {
    if (!env.GOOGLE_AUTH_ENABLED) {
      throw new ServiceUnavailableError('Google authentication is currently disabled on this server.');
    }

    const profile = await this.verifyIdToken(credential);

    if (!profile.emailVerified) {
      throw new AuthenticationError('Google account email must be verified to link.');
    }

    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found.');
    }

    // Check if this Google identity is already linked
    const existingIdentity = await IdentityRepository.findByProviderSubject(
      AuthProvider.GOOGLE,
      profile.sub
    );

    if (existingIdentity) {
      if (existingIdentity.userId === userId) {
        return { message: 'Google account is already linked to your profile.' };
      }
      // Cross-user linking protection
      throw new ConflictError(
        'This Google account is already linked to another AuthForge user.',
        'GOOGLE_IDENTITY_ALREADY_LINKED'
      );
    }

    const normalizedEmail = UserService.normalizeEmail(profile.email);

    await IdentityRepository.create({
      user: { connect: { id: userId } },
      provider: AuthProvider.GOOGLE,
      providerSubject: profile.sub,
      email: normalizedEmail
    });

    await SecurityEventService.recordEvent({
      userId,
      type: SecurityEventType.GOOGLE_IDENTITY_LINKED,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      metadata: { provider: 'GOOGLE' }
    });

    logger.info(`Google identity successfully linked to user ID: ${userId}`);

    return { message: 'Google account linked successfully.' };
  }
}
