import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger.js';

// Shared singleton Prisma Client instance
export const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'warn' }
  ]
});

// Attach event listeners for Prisma internal warnings and errors
prisma.$on('warn' as never, (e: { message: string }) => {
  logger.warn(`Prisma warning: ${e.message}`);
});

prisma.$on('error' as never, (e: { message: string }) => {
  logger.error(`Prisma error: ${e.message}`);
});

export interface DatabaseHealthResult {
  connected: boolean;
  latencyMs?: number;
  error?: string;
}

/**
 * Checks PostgreSQL connectivity by executing a raw SELECT 1 query.
 * Measures round-trip latency without exposing credentials.
 */
export async function checkDatabaseConnection(): Promise<DatabaseHealthResult> {
  const startTime = Date.now();
  try {
    await prisma.$queryRawUnsafe('SELECT 1');
    const latencyMs = Date.now() - startTime;
    return {
      connected: true,
      latencyMs
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown database connection error';
    logger.error('Database health check failed', error);
    return {
      connected: false,
      error: 'Database is currently unreachable'
    };
  }
}

/**
 * Gracefully disconnects the Prisma client.
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect();
    logger.info('Database connection closed gracefully.');
  } catch (error) {
    logger.error('Error during database disconnection:', error);
  }
}
