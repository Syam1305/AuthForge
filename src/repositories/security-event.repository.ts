import { Prisma, SecurityEvent, SecurityEventType } from '@prisma/client';
import { prisma } from '../database/prisma.js';

export interface CreateSecurityEventInput {
  userId?: string | null;
  type: SecurityEventType;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Record<string, unknown> | null;
}

export class SecurityEventRepository {
  /**
   * Creates a security audit event record in the database.
   */
  public static async create(
    data: CreateSecurityEventInput,
    tx?: Prisma.TransactionClient
  ): Promise<SecurityEvent> {
    const client = tx || prisma;
    return client.securityEvent.create({
      data: {
        userId: data.userId || null,
        type: data.type,
        ipAddress: data.ipAddress || null,
        userAgent: data.userAgent || null,
        metadata: data.metadata ? (data.metadata as Prisma.InputJsonValue) : Prisma.JsonNull
      }
    });
  }

  /**
   * Lists security events for a specific user (ordered newest to oldest).
   */
  public static async listByUserId(
    userId: string,
    limit = 50,
    tx?: Prisma.TransactionClient
  ): Promise<SecurityEvent[]> {
    const client = tx || prisma;
    return client.securityEvent.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  }

  /**
   * Deletes security events older than the specified retention date.
   */
  public static async deleteOlderThan(
    cutoffDate: Date,
    tx?: Prisma.TransactionClient
  ): Promise<number> {
    const client = tx || prisma;
    const result = await client.securityEvent.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate
        }
      }
    });
    return result.count;
  }
}
