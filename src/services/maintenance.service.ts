import { Prisma } from '@prisma/client';
import { prisma } from '../database/prisma.js';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';

export interface MaintenanceReport {
  otpChallengesCleaned: number;
  resetAuthorizationsCleaned: number;
  securityEventsCleaned: number;
  sessionsCleaned: number;
  refreshTokensCleaned: number;
  timestamp: Date;
}

export class MaintenanceService {
  /**
   * Deletes consumed or expired OTP challenges older than cutoff days.
   */
  public static async cleanupExpiredOtpChallenges(
    daysOld = 7,
    tx?: Prisma.TransactionClient
  ): Promise<number> {
    const client = tx || prisma;
    const cutoff = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);

    const result = await client.otpChallenge.deleteMany({
      where: {
        OR: [
          { consumedAt: { not: null, lt: cutoff } },
          { expiresAt: { lt: cutoff } }
        ]
      }
    });

    return result.count;
  }

  /**
   * Deletes consumed or expired password reset authorizations older than cutoff days.
   */
  public static async cleanupExpiredResetAuthorizations(
    daysOld = 7,
    tx?: Prisma.TransactionClient
  ): Promise<number> {
    const client = tx || prisma;
    const cutoff = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);

    const result = await client.passwordResetAuthorization.deleteMany({
      where: {
        OR: [
          { consumedAt: { not: null, lt: cutoff } },
          { expiresAt: { lt: cutoff } }
        ]
      }
    });

    return result.count;
  }

  /**
   * Deletes security audit events older than configured retention period.
   */
  public static async cleanupSecurityEvents(
    retentionDays = env.SECURITY_EVENT_RETENTION_DAYS,
    tx?: Prisma.TransactionClient
  ): Promise<number> {
    const client = tx || prisma;
    const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

    const result = await client.securityEvent.deleteMany({
      where: {
        createdAt: {
          lt: cutoff
        }
      }
    });

    return result.count;
  }

  /**
   * Deletes fully expired or revoked sessions older than cutoff days (cascade deletes associated tokens).
   * Note: Retains recent revoked/expired sessions (< cutoff) to preserve replay detection security trails.
   */
  public static async cleanupExpiredSessions(
    daysOld = 30,
    tx?: Prisma.TransactionClient
  ): Promise<number> {
    const client = tx || prisma;
    const cutoff = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);

    const result = await client.session.deleteMany({
      where: {
        OR: [
          { revokedAt: { not: null, lt: cutoff } },
          { expiresAt: { lt: cutoff } }
        ]
      }
    });

    return result.count;
  }

  /**
   * Deletes obsolete replaced/revoked/consumed refresh tokens older than cutoff days.
   * Note: NEVER deletes active unconsumed tokens (consumedAt = null, revokedAt = null, expiresAt > now).
   */
  public static async cleanupOldRefreshTokens(
    daysOld = 30,
    tx?: Prisma.TransactionClient
  ): Promise<number> {
    const client = tx || prisma;
    const cutoff = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);

    const result = await client.refreshToken.deleteMany({
      where: {
        OR: [
          { revokedAt: { not: null, lt: cutoff } },
          { consumedAt: { not: null, lt: cutoff } },
          { expiresAt: { lt: cutoff } }
        ]
      }
    });

    return result.count;
  }

  /**
   * Executes complete database maintenance cycle.
   */
  public static async runMaintenance(): Promise<MaintenanceReport> {
    logger.info('Starting AuthForge database maintenance cycle...');

    const [
      otpChallengesCleaned,
      resetAuthorizationsCleaned,
      securityEventsCleaned,
      sessionsCleaned,
      refreshTokensCleaned
    ] = await Promise.all([
      this.cleanupExpiredOtpChallenges(7),
      this.cleanupExpiredResetAuthorizations(7),
      this.cleanupSecurityEvents(env.SECURITY_EVENT_RETENTION_DAYS),
      this.cleanupExpiredSessions(30),
      this.cleanupOldRefreshTokens(30)
    ]);

    const report: MaintenanceReport = {
      otpChallengesCleaned,
      resetAuthorizationsCleaned,
      securityEventsCleaned,
      sessionsCleaned,
      refreshTokensCleaned,
      timestamp: new Date()
    };

    logger.info('AuthForge database maintenance cycle completed successfully.', {
      cleaned: report
    });

    return report;
  }
}
