import http from 'http';
import { app } from './app.js';
import { env } from './config/env.js';
import { checkDatabaseConnection, disconnectDatabase } from './database/prisma.js';
import { logger } from './utils/logger.js';

async function bootstrap(): Promise<void> {
  logger.info('Initializing AuthForge server...');

  // 1. Verify PostgreSQL Database Connectivity
  logger.info('Verifying database connectivity...');
  const dbHealth = await checkDatabaseConnection();

  if (!dbHealth.connected) {
    logger.error('CRITICAL: Failed to connect to PostgreSQL database during startup.');
    logger.error('Please verify your DATABASE_URL configuration and that PostgreSQL is running.');
    process.exit(1);
  }

  const latencyInfo = dbHealth.latencyMs !== undefined ? ` (${dbHealth.latencyMs}ms latency)` : '';
  logger.info(`Database connection verified successfully${latencyInfo}.`);

  // 2. Start HTTP Server
  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    const banner = [
      '',
      '=================================',
      'AuthForge API',
      '=================================',
      `Environment : ${env.NODE_ENV}`,
      `Port        : ${env.PORT}`,
      `Database    : connected`,
      `API         : http://localhost:${env.PORT}`,
      '=================================',
      ''
    ].join('\n');

    console.log(banner);
  });

  // 3. Graceful Shutdown Handlers
  let isShuttingDown = false;

  const handleShutdown = async (signal: string) => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    logger.info(`Received ${signal}. Initiating graceful shutdown...`);

    server.close(async () => {
      logger.info('HTTP server closed. Stopping background connections...');
      await disconnectDatabase();
      logger.info('AuthForge shutdown complete. Exiting.');
      process.exit(0);
    });

    // Force shutdown if cleanup takes longer than 10 seconds
    setTimeout(() => {
      logger.error('Graceful shutdown timed out. Forcing termination.');
      process.exit(1);
    }, 10000).unref();
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
}

bootstrap().catch((err) => {
  logger.error('Unhandled fatal error during AuthForge bootstrap:', err);
  process.exit(1);
});
