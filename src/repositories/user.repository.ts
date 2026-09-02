import { User, Prisma } from '@prisma/client';
import { prisma } from '../database/prisma.js';

export class UserRepository {
  /**
   * Finds a single user by their normalized unique email address.
   */
  public static async findByEmail(
    email: string,
    tx?: Prisma.TransactionClient
  ): Promise<User | null> {
    const client = tx || prisma;
    return client.user.findUnique({
      where: { email }
    });
  }

  /**
   * Finds a single user by their UUID.
   */
  public static async findById(
    id: string,
    tx?: Prisma.TransactionClient
  ): Promise<User | null> {
    const client = tx || prisma;
    return client.user.findUnique({
      where: { id }
    });
  }

  /**
   * Creates a new user record in the database.
   */
  public static async create(
    data: Prisma.UserCreateInput,
    tx?: Prisma.TransactionClient
  ): Promise<User> {
    const client = tx || prisma;
    return client.user.create({
      data
    });
  }

  /**
   * Updates an existing user record.
   */
  public static async update(
    id: string,
    data: Prisma.UserUpdateInput,
    tx?: Prisma.TransactionClient
  ): Promise<User> {
    const client = tx || prisma;
    return client.user.update({
      where: { id },
      data
    });
  }

  /**
   * Sets the emailVerifiedAt timestamp for a user.
   */
  public static async markEmailVerified(
    id: string,
    verifiedAt = new Date(),
    tx?: Prisma.TransactionClient
  ): Promise<User> {
    const client = tx || prisma;
    return client.user.update({
      where: { id },
      data: {
        emailVerifiedAt: verifiedAt
      }
    });
  }

  /**
   * Updates a user's passwordHash, sets passwordUpdatedAt, and resets failed attempts.
   */
  public static async updatePassword(
    id: string,
    passwordHash: string,
    tx?: Prisma.TransactionClient
  ): Promise<User> {
    const client = tx || prisma;
    return client.user.update({
      where: { id },
      data: {
        passwordHash,
        passwordUpdatedAt: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null
      }
    });
  }

  /**
   * Atomically increments the failed login attempts counter.
   */
  public static async incrementFailedLoginAttempts(
    id: string,
    tx?: Prisma.TransactionClient
  ): Promise<User> {
    const client = tx || prisma;
    return client.user.update({
      where: { id },
      data: {
        failedLoginAttempts: {
          increment: 1
        }
      }
    });
  }

  /**
   * Sets a temporary account lock until the specified timestamp.
   */
  public static async lockAccount(
    id: string,
    lockedUntil: Date,
    tx?: Prisma.TransactionClient
  ): Promise<User> {
    const client = tx || prisma;
    return client.user.update({
      where: { id },
      data: {
        lockedUntil
      }
    });
  }

  /**
   * Resets failed login attempts counter and clears lockout state.
   */
  public static async resetFailedAttempts(
    id: string,
    tx?: Prisma.TransactionClient
  ): Promise<User> {
    const client = tx || prisma;
    return client.user.update({
      where: { id },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null
      }
    });
  }
}
