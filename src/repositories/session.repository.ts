import { Session, Prisma } from '@prisma/client';
import { prisma } from '../database/prisma.js';

export class SessionRepository {
  /**
   * Creates a new session record in PostgreSQL with metadata.
   */
  public static async create(
    data: {
      userId: string;
      expiresAt: Date;
      ipAddress?: string | null;
      userAgent?: string | null;
    },
    tx?: Prisma.TransactionClient
  ): Promise<Session> {
    const client = tx || prisma;
    return client.session.create({
      data: {
        userId: data.userId,
        expiresAt: data.expiresAt,
        ipAddress: data.ipAddress || null,
        userAgent: data.userAgent ? data.userAgent.slice(0, 500) : null,
        lastUsedAt: new Date()
      }
    });
  }

  /**
   * Finds a session by its unique ID.
   */
  public static async findById(
    id: string,
    tx?: Prisma.TransactionClient
  ): Promise<Session | null> {
    const client = tx || prisma;
    return client.session.findUnique({
      where: { id }
    });
  }

  /**
   * Retrieves an active, unrevoked session by ID.
   */
  public static async findActiveById(
    id: string,
    tx?: Prisma.TransactionClient
  ): Promise<Session | null> {
    const client = tx || prisma;
    return client.session.findFirst({
      where: {
        id,
        revokedAt: null,
        expiresAt: { gt: new Date() }
      }
    });
  }

  /**
   * Lists all sessions for a specific user ordered by creation date.
   */
  public static async listByUserId(
    userId: string,
    tx?: Prisma.TransactionClient
  ): Promise<Session[]> {
    const client = tx || prisma;
    return client.session.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Updates the lastUsedAt timestamp for an active session.
   */
  public static async touch(
    id: string,
    lastUsedAt = new Date(),
    tx?: Prisma.TransactionClient
  ): Promise<Session> {
    const client = tx || prisma;
    return client.session.update({
      where: { id },
      data: { lastUsedAt }
    });
  }

  /**
   * Revokes a specific session by setting its revokedAt timestamp and optional reason.
   */
  public static async revoke(
    id: string,
    revokedAt = new Date(),
    reason?: string,
    tx?: Prisma.TransactionClient
  ): Promise<Session> {
    const client = tx || prisma;
    return client.session.update({
      where: { id },
      data: {
        revokedAt,
        revocationReason: reason || null
      }
    });
  }

  /**
   * Revokes all active sessions belonging to a user.
   */
  public static async revokeAllForUser(
    userId: string,
    revokedAt = new Date(),
    reason?: string,
    tx?: Prisma.TransactionClient
  ): Promise<Prisma.BatchPayload> {
    const client = tx || prisma;
    return client.session.updateMany({
      where: {
        userId,
        revokedAt: null
      },
      data: {
        revokedAt,
        revocationReason: reason || null
      }
    });
  }

  /**
   * Counts active, unrevoked and unexpired sessions for a user.
   */
  public static async countActiveByUserId(
    userId: string,
    tx?: Prisma.TransactionClient
  ): Promise<number> {
    const client = tx || prisma;
    return client.session.count({
      where: {
        userId,
        revokedAt: null,
        expiresAt: { gt: new Date() }
      }
    });
  }
}
