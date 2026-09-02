import { Prisma, Session, SecurityEventType } from '@prisma/client';
import { prisma } from '../database/prisma.js';
import { SessionRepository } from '../repositories/session.repository.js';
import { RefreshTokenRepository } from '../repositories/refresh-token.repository.js';
import { UserRepository } from '../repositories/user.repository.js';
import { TokenService, AccessTokenResult } from './token.service.js';
import { SecurityEventService } from './security-event.service.js';
import {
  InvalidRefreshTokenError,
  RefreshTokenExpiredError,
  RefreshTokenReusedError,
  SessionRevokedError,
  SessionExpiredError,
  SessionNotFoundError,
  SessionForbiddenError,
  ForbiddenError
} from '../errors/app.error.js';
import { logger } from '../utils/logger.js';

export interface AuthTokensResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
}

export interface SessionInfo {
  id: string;
  createdAt: Date;
  lastUsedAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
  ipAddress: string | null;
  userAgent: string | null;
  isActive: boolean;
  isCurrent: boolean;
}

export class SessionService {
  /**
   * Creates a new session, initial refresh token (with new familyId), and access token.
   */
  public static async createSession(
    userId: string,
    metadata?: { ipAddress?: string | null; userAgent?: string | null },
    tx?: Prisma.TransactionClient
  ): Promise<{ session: Session; tokens: AuthTokensResponse }> {
    const execute = async (client: Prisma.TransactionClient) => {
      // 1. Calculate session expiry based on refresh token lifetime
      const expiresAt = TokenService.calculateRefreshTokenExpiry();

      // 2. Create session record with client metadata
      const session = await SessionRepository.create(
        {
          userId,
          expiresAt,
          ipAddress: metadata?.ipAddress,
          userAgent: metadata?.userAgent
        },
        client
      );

      // 3. Generate high-entropy refresh token & family ID
      const plainRefreshToken = TokenService.generateRefreshToken();
      const tokenHash = TokenService.hashRefreshToken(plainRefreshToken);
      const familyId = TokenService.generateFamilyId();

      // 4. Store hashed refresh token in database
      await RefreshTokenRepository.create(
        {
          sessionId: session.id,
          familyId,
          tokenHash,
          expiresAt
        },
        client
      );

      // 5. Generate access token
      const accessResult: AccessTokenResult = TokenService.createAccessToken({
        userId,
        sessionId: session.id
      });

      return {
        session,
        tokens: {
          accessToken: accessResult.accessToken,
          refreshToken: plainRefreshToken,
          tokenType: 'Bearer' as const,
          expiresIn: accessResult.expiresIn
        }
      };
    };

    if (tx) {
      return execute(tx);
    }
    return prisma.$transaction(execute);
  }

  /**
   * Validates that a session exists, belongs to the specified user, is not revoked, and is not expired.
   */
  public static async validateSession(sessionId: string, userId: string): Promise<Session> {
    const session = await SessionRepository.findById(sessionId);

    if (!session) {
      throw new SessionNotFoundError();
    }

    if (session.userId !== userId) {
      throw new SessionForbiddenError();
    }

    if (session.revokedAt !== null) {
      throw new SessionRevokedError();
    }

    if (session.expiresAt <= new Date()) {
      throw new SessionExpiredError();
    }

    // Ensure user account is still active
    const user = await UserRepository.findById(userId);
    if (!user || !user.isActive) {
      throw new ForbiddenError('Account is inactive.', 'ACCOUNT_INACTIVE');
    }

    return session;
  }

  /**
   * Updates session activity timestamp safely without failing the request on telemetry error.
   */
  public static async touchSession(sessionId: string): Promise<void> {
    try {
      await SessionRepository.touch(sessionId);
    } catch (error) {
      // Activity tracking failure must never block or degrade authentication
      logger.warn(`Failed to update session activity for session ${sessionId}: ${(error as Error).message}`);
    }
  }

  /**
   * Rotates a refresh token using atomic consumption, token family tracking, and reuse detection.
   */
  public static async rotateRefreshToken(
    plainRefreshToken: string,
    metadata?: { ipAddress?: string | null; userAgent?: string | null }
  ): Promise<AuthTokensResponse> {
    if (!plainRefreshToken || typeof plainRefreshToken !== 'string') {
      throw new InvalidRefreshTokenError('Refresh token is required.');
    }

    const tokenHash = TokenService.hashRefreshToken(plainRefreshToken);
    const existingToken = await RefreshTokenRepository.findByTokenHash(tokenHash);

    if (!existingToken) {
      logger.warn('Refresh token rotation failed: Token hash not found in database.');
      throw new InvalidRefreshTokenError();
    }

    // 1. REUSE DETECTION: If token was already consumed, an attacker may be replaying stolen tokens
    if (existingToken.consumedAt !== null) {
      logger.error(
        `SECURITY ALERT: Refresh token reuse detected for family ${existingToken.familyId} on session ${existingToken.sessionId}. Revoking family.`
      );

      // Record security event
      await SecurityEventService.recordEvent({
        userId: existingToken.session?.userId || null,
        type: SecurityEventType.REFRESH_REUSE_DETECTED,
        ipAddress: metadata?.ipAddress,
        userAgent: metadata?.userAgent,
        metadata: {
          sessionId: existingToken.sessionId,
          familyId: existingToken.familyId
        }
      });

      // Immediately invalidate all tokens in the family and revoke the associated session
      await prisma.$transaction(async (tx) => {
        await RefreshTokenRepository.revokeFamily(existingToken.familyId, new Date(), tx);
        await SessionRepository.revoke(
          existingToken.sessionId,
          new Date(),
          'SECURITY_REPLAY',
          tx
        );
      });

      throw new RefreshTokenReusedError();
    }

    // 2. Check if token was revoked
    if (existingToken.revokedAt !== null) {
      logger.warn(`Refresh token rejected: Token was revoked.`);
      throw new InvalidRefreshTokenError('Refresh token has been revoked.');
    }

    // 3. Check if token has expired
    if (existingToken.expiresAt <= new Date()) {
      throw new RefreshTokenExpiredError();
    }

    // 4. Check session validity
    const session = existingToken.session;
    if (!session || session.revokedAt !== null) {
      throw new SessionRevokedError();
    }

    if (session.expiresAt <= new Date()) {
      throw new SessionExpiredError();
    }

    // 5. Check if user is active
    const user = await UserRepository.findById(session.userId);
    if (!user || !user.isActive) {
      throw new ForbiddenError('Account is inactive.', 'ACCOUNT_INACTIVE');
    }

    // 6. ATOMIC ROTATION TRANSACTION: Protects against concurrent race conditions
    const result = await prisma.$transaction(async (tx) => {
      // Step A: Atomically consume the current token
      const wasConsumed = await RefreshTokenRepository.atomicallyConsume(
        existingToken.id,
        undefined,
        tx
      );

      if (!wasConsumed) {
        // Race condition: another concurrent request consumed or revoked this token
        logger.warn(
          `Concurrent refresh collision detected for token ID ${existingToken.id}. Rejecting duplicate request.`
        );
        throw new InvalidRefreshTokenError('Token already consumed in a concurrent request.');
      }

      // Step B: Generate replacement refresh token maintaining the same familyId
      const newPlainRefreshToken = TokenService.generateRefreshToken();
      const newTokenHash = TokenService.hashRefreshToken(newPlainRefreshToken);
      const newExpiry = TokenService.calculateRefreshTokenExpiry();

      const newRefreshTokenRecord = await RefreshTokenRepository.create(
        {
          sessionId: session.id,
          familyId: existingToken.familyId,
          tokenHash: newTokenHash,
          expiresAt: newExpiry
        },
        tx
      );

      // Step C: Link old token to the new replacement token ID
      await tx.refreshToken.update({
        where: { id: existingToken.id },
        data: { replacedByTokenId: newRefreshTokenRecord.id }
      });

      // Step D: Touch session activity
      await SessionRepository.touch(session.id, new Date(), tx);

      // Step E: Generate new short-lived access token
      const accessResult = TokenService.createAccessToken({
        userId: session.userId,
        sessionId: session.id
      });

      logger.info(
        `Refresh token rotated successfully for user ${session.userId}, session ${session.id}`
      );

      return {
        accessToken: accessResult.accessToken,
        refreshToken: newPlainRefreshToken,
        tokenType: 'Bearer' as const,
        expiresIn: accessResult.expiresIn
      };
    });

    // Record refresh success audit event
    await SecurityEventService.recordEvent({
      userId: session.userId,
      type: SecurityEventType.REFRESH_SUCCESS,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      metadata: {
        sessionId: session.id
      }
    });

    return result;
  }

  /**
   * Revokes a specific session and invalidates its refresh tokens after verifying ownership.
   */
  public static async revokeSession(
    sessionId: string,
    requestingUserId: string,
    reason = 'SESSION_REVOKED',
    metadata?: { ipAddress?: string | null; userAgent?: string | null }
  ): Promise<{ message: string }> {
    const session = await SessionRepository.findById(sessionId);

    if (!session) {
      throw new SessionNotFoundError();
    }

    if (session.userId !== requestingUserId) {
      throw new SessionForbiddenError();
    }

    await prisma.$transaction(async (tx) => {
      await SessionRepository.revoke(sessionId, new Date(), reason, tx);
      await RefreshTokenRepository.revokeAllForSession(sessionId, new Date(), tx);
    });

    await SecurityEventService.recordEvent({
      userId: requestingUserId,
      type: SecurityEventType.SESSION_REVOKED,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      metadata: { sessionId, reason }
    });

    logger.info(`Session ${sessionId} revoked by user ${requestingUserId} (Reason: ${reason})`);

    return { message: 'Session revoked successfully.' };
  }

  /**
   * Revokes all active sessions for a user and invalidates all associated refresh tokens.
   */
  public static async revokeAllSessions(
    userId: string,
    reason = 'LOGOUT_ALL',
    tx?: Prisma.TransactionClient,
    metadata?: { ipAddress?: string | null; userAgent?: string | null }
  ): Promise<{ message: string }> {
    const execute = async (client: Prisma.TransactionClient) => {
      const now = new Date();
      await SessionRepository.revokeAllForUser(userId, now, reason, client);
      await RefreshTokenRepository.revokeAllForUser(userId, now, client);
      logger.info(`All sessions and refresh tokens revoked for user ${userId} (Reason: ${reason})`);
    };

    if (tx) {
      await execute(tx);
    } else {
      await prisma.$transaction(execute);
    }

    await SecurityEventService.recordEvent({
      userId,
      type: reason === 'LOGOUT_ALL' ? SecurityEventType.LOGOUT_ALL : SecurityEventType.SESSION_REVOKED,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      metadata: { reason }
    });

    return { message: 'All sessions revoked successfully.' };
  }

  /**
   * Lists all sessions for a user with safe metadata and current session indicator.
   */
  public static async listSessions(
    userId: string,
    currentSessionId?: string
  ): Promise<SessionInfo[]> {
    const sessions = await SessionRepository.listByUserId(userId);
    const now = new Date();

    return sessions.map((s) => ({
      id: s.id,
      createdAt: s.createdAt,
      lastUsedAt: s.lastUsedAt,
      expiresAt: s.expiresAt,
      revokedAt: s.revokedAt,
      ipAddress: s.ipAddress,
      userAgent: s.userAgent,
      isActive: s.revokedAt === null && s.expiresAt > now,
      isCurrent: s.id === currentSessionId
    }));
  }
}
