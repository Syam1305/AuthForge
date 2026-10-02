import { AuthIdentity, AuthProvider, Prisma } from '@prisma/client';
import { prisma } from '../database/prisma.js';

export class IdentityRepository {
  /**
   * Finds an external identity by provider and providerSubject (e.g. GOOGLE + sub).
   */
  public static async findByProviderSubject(
    provider: AuthProvider,
    providerSubject: string,
    tx?: Prisma.TransactionClient
  ): Promise<(AuthIdentity & { user: import('@prisma/client').User }) | null> {
    const client = tx || prisma;
    return client.authIdentity.findUnique({
      where: {
        provider_providerSubject: {
          provider,
          providerSubject
        }
      },
      include: {
        user: true
      }
    });
  }

  /**
   * Finds all external identities associated with a user.
   */
  public static async findByUserId(
    userId: string,
    tx?: Prisma.TransactionClient
  ): Promise<AuthIdentity[]> {
    const client = tx || prisma;
    return client.authIdentity.findMany({
      where: { userId }
    });
  }

  /**
   * Creates a new external identity mapping.
   */
  public static async create(
    data: Prisma.AuthIdentityCreateInput,
    tx?: Prisma.TransactionClient
  ): Promise<AuthIdentity> {
    const client = tx || prisma;
    return client.authIdentity.create({
      data
    });
  }

  /**
   * Deletes an external identity by ID.
   */
  public static async delete(
    id: string,
    tx?: Prisma.TransactionClient
  ): Promise<AuthIdentity> {
    const client = tx || prisma;
    return client.authIdentity.delete({
      where: { id }
    });
  }
}
