import { OtpChallenge, OtpPurpose, Prisma } from '@prisma/client';
import { prisma } from '../database/prisma.js';

export class OtpRepository {
  /**
   * Creates a new OTP challenge record in PostgreSQL.
   */
  public static async createChallenge(
    data: {
      userId: string;
      purpose: OtpPurpose;
      codeHash: string;
      expiresAt: Date;
      maxAttempts?: number;
    },
    tx?: Prisma.TransactionClient
  ): Promise<OtpChallenge> {
    const client = tx || prisma;
    return client.otpChallenge.create({
      data: {
        userId: data.userId,
        purpose: data.purpose,
        codeHash: data.codeHash,
        expiresAt: data.expiresAt,
        maxAttempts: data.maxAttempts ?? 5
      }
    });
  }

  /**
   * Retrieves the latest active unconsumed challenge for a user and purpose.
   */
  public static async findActiveChallenge(
    userId: string,
    purpose: OtpPurpose,
    tx?: Prisma.TransactionClient
  ): Promise<OtpChallenge | null> {
    const client = tx || prisma;
    return client.otpChallenge.findFirst({
      where: {
        userId,
        purpose,
        consumedAt: null,
        expiresAt: { gt: new Date() }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Retrieves the most recent challenge for a user and purpose (for cooldown checks).
   */
  public static async findLatestChallenge(
    userId: string,
    purpose: OtpPurpose,
    tx?: Prisma.TransactionClient
  ): Promise<OtpChallenge | null> {
    const client = tx || prisma;
    return client.otpChallenge.findFirst({
      where: {
        userId,
        purpose
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Atomically increments the failed attempt count on a challenge.
   */
  public static async incrementAttempts(
    id: string,
    tx?: Prisma.TransactionClient
  ): Promise<OtpChallenge> {
    const client = tx || prisma;
    return client.otpChallenge.update({
      where: { id },
      data: {
        attempts: { increment: 1 }
      }
    });
  }

  /**
   * Atomically marks a challenge as consumed.
   */
  public static async consumeChallenge(
    id: string,
    tx?: Prisma.TransactionClient
  ): Promise<OtpChallenge> {
    const client = tx || prisma;
    return client.otpChallenge.update({
      where: { id },
      data: {
        consumedAt: new Date()
      }
    });
  }

  /**
   * Invalidates (marks consumed/expired) all active challenges for a user and purpose.
   */
  public static async invalidateActiveChallenges(
    userId: string,
    purpose: OtpPurpose,
    tx?: Prisma.TransactionClient
  ): Promise<Prisma.BatchPayload> {
    const client = tx || prisma;
    return client.otpChallenge.updateMany({
      where: {
        userId,
        purpose,
        consumedAt: null
      },
      data: {
        consumedAt: new Date()
      }
    });
  }
}
