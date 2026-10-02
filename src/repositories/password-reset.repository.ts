import { PasswordResetAuthorization, Prisma } from '@prisma/client';
import { prisma } from '../database/prisma.js';

export class PasswordResetRepository {
  /**
   * Creates a new password reset authorization record.
   */
  public static async createAuthorization(
    data: {
      userId: string;
      tokenHash: string;
      expiresAt: Date;
    },
    tx?: Prisma.TransactionClient
  ): Promise<PasswordResetAuthorization> {
    const client = tx || prisma;
    return client.passwordResetAuthorization.create({
      data: {
        userId: data.userId,
        tokenHash: data.tokenHash,
        expiresAt: data.expiresAt
      }
    });
  }

  /**
   * Finds a reset authorization by its SHA-256 token hash.
   */
  public static async findByTokenHash(
    tokenHash: string,
    tx?: Prisma.TransactionClient
  ): Promise<PasswordResetAuthorization | null> {
    const client = tx || prisma;
    return client.passwordResetAuthorization.findUnique({
      where: { tokenHash }
    });
  }

  /**
   * Atomically marks a reset authorization as consumed.
   * Returns boolean indicating whether this call consumed the authorization (guards against concurrent race condition).
   */
  public static async consumeAuthorization(
    id: string,
    tx?: Prisma.TransactionClient
  ): Promise<boolean> {
    const client = tx || prisma;
    const result = await client.passwordResetAuthorization.updateMany({
      where: {
        id,
        consumedAt: null
      },
      data: {
        consumedAt: new Date()
      }
    });
    return result.count === 1;
  }

  /**
   * Invalidates all active unconsumed reset authorizations for a user.
   */
  public static async invalidateUserAuthorizations(
    userId: string,
    tx?: Prisma.TransactionClient
  ): Promise<Prisma.BatchPayload> {
    const client = tx || prisma;
    return client.passwordResetAuthorization.updateMany({
      where: {
        userId,
        consumedAt: null
      },
      data: {
        consumedAt: new Date()
      }
    });
  }
}
