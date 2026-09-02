import { RefreshToken, Prisma } from '@prisma/client';
import { prisma } from '../database/prisma.js';

export type RefreshTokenWithSession = RefreshToken & {
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    revokedAt: Date | null;
  };
};

export class RefreshTokenRepository {
  /**
   * Persists a new refresh token record.
   */
  public static async create(
    data: {
      sessionId: string;
      familyId: string;
      tokenHash: string;
      expiresAt: Date;
    },
    tx?: Prisma.TransactionClient
  ): Promise<RefreshToken> {
    const client = tx || prisma;
    return client.refreshToken.create({
      data: {
        sessionId: data.sessionId,
        familyId: data.familyId,
        tokenHash: data.tokenHash,
        expiresAt: data.expiresAt
      }
    });
  }

  /**
   * Finds a refresh token by its SHA-256 hash along with associated session data.
   */
  public static async findByTokenHash(
    tokenHash: string,
    tx?: Prisma.TransactionClient
  ): Promise<RefreshTokenWithSession | null> {
    const client = tx || prisma;
    return client.refreshToken.findUnique({
      where: { tokenHash },
      include: {
        session: {
          select: {
            id: true,
            userId: true,
            expiresAt: true,
            revokedAt: true
          }
        }
      }
    });
  }

  /**
   * Atomically consumes a refresh token if and only if it has not yet been consumed or revoked.
   * Returns true if successfully updated, false if already consumed/revoked (race condition or reuse).
   */
  public static async atomicallyConsume(
    id: string,
    replacedByTokenId?: string,
    tx?: Prisma.TransactionClient
  ): Promise<boolean> {
    const client = tx || prisma;
    const result = await client.refreshToken.updateMany({
      where: {
        id,
        consumedAt: null,
        revokedAt: null
      },
      data: {
        consumedAt: new Date(),
        replacedByTokenId: replacedByTokenId ?? null
      }
    });

    return result.count === 1;
  }

  /**
   * Revokes a specific refresh token by ID.
   */
  public static async revoke(
    id: string,
    revokedAt = new Date(),
    tx?: Prisma.TransactionClient
  ): Promise<Prisma.BatchPayload> {
    const client = tx || prisma;
    return client.refreshToken.updateMany({
      where: {
        id,
        revokedAt: null
      },
      data: { revokedAt }
    });
  }

  /**
   * Revokes all tokens belonging to an entire token family (used upon reuse detection).
   */
  public static async revokeFamily(
    familyId: string,
    revokedAt = new Date(),
    tx?: Prisma.TransactionClient
  ): Promise<Prisma.BatchPayload> {
    const client = tx || prisma;
    return client.refreshToken.updateMany({
      where: {
        familyId,
        revokedAt: null
      },
      data: { revokedAt }
    });
  }

  /**
   * Revokes all active refresh tokens associated with a specific session ID.
   */
  public static async revokeAllForSession(
    sessionId: string,
    revokedAt = new Date(),
    tx?: Prisma.TransactionClient
  ): Promise<Prisma.BatchPayload> {
    const client = tx || prisma;
    return client.refreshToken.updateMany({
      where: {
        sessionId,
        revokedAt: null
      },
      data: { revokedAt }
    });
  }

  /**
   * Revokes all active refresh tokens associated with a specific user.
   */
  public static async revokeAllForUser(
    userId: string,
    revokedAt = new Date(),
    tx?: Prisma.TransactionClient
  ): Promise<Prisma.BatchPayload> {
    const client = tx || prisma;
    return client.refreshToken.updateMany({
      where: {
        session: { userId },
        revokedAt: null
      },
      data: { revokedAt }
    });
  }
}
