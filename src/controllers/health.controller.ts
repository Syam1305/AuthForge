import { Request, Response } from 'express';
import { checkDatabaseConnection } from '../database/prisma.js';

export class HealthController {
  /**
   * Infrastructure / service liveness check.
   * Confirms that the Node.js process is alive.
   */
  public static getHealth(_req: Request, res: Response): void {
    res.status(200).json({
      success: true,
      service: 'AuthForge',
      status: 'healthy'
    });
  }

  /**
   * Service readiness probe.
   * Confirms that PostgreSQL and essential dependencies are ready to accept traffic.
   */
  public static async getReadiness(_req: Request, res: Response): Promise<void> {
    const dbStatus = await checkDatabaseConnection();

    if (dbStatus.connected) {
      res.status(200).json({
        success: true,
        service: 'AuthForge',
        status: 'ready'
      });
      return;
    }

    res.status(503).json({
      success: false,
      error: {
        code: 'NOT_READY',
        message: 'Service is not ready to accept traffic.'
      }
    });
  }

  /**
   * Database connectivity health check.
   * Executes SELECT 1 against PostgreSQL.
   */
  public static async getDbHealth(_req: Request, res: Response): Promise<void> {
    const dbStatus = await checkDatabaseConnection();

    if (dbStatus.connected) {
      res.status(200).json({
        success: true,
        service: 'AuthForge',
        database: 'connected'
      });
      return;
    }

    res.status(503).json({
      success: false,
      error: {
        code: 'DATABASE_UNAVAILABLE',
        message: 'Database is currently unavailable.'
      }
    });
  }
}
