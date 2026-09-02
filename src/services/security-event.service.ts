import { Prisma, SecurityEventType } from '@prisma/client';
import { SecurityEventRepository, CreateSecurityEventInput } from '../repositories/security-event.repository.js';
import { logger } from '../utils/logger.js';

const SENSITIVE_KEYS = new Set([
  'password',
  'pass',
  'pwd',
  'currentpassword',
  'newpassword',
  'passwordhash',
  'token',
  'accesstoken',
  'refreshtoken',
  'tokenhash',
  'otp',
  'code',
  'codehash',
  'resettoken',
  'resettokenhash',
  'secret',
  'jwt',
  'jwt_secret',
  'database_url',
  'authorization',
  'cookie'
]);

function sanitizeMetadata(metadata?: Record<string, unknown> | null): Record<string, unknown> | undefined {
  if (!metadata || typeof metadata !== 'object') {
    return undefined;
  }

  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      clean[key] = '[REDACTED]';
    } else if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      clean[key] = sanitizeMetadata(value as Record<string, unknown>);
    } else {
      clean[key] = value;
    }
  }
  return clean;
}

export class SecurityEventService {
  /**
   * Records a security audit event with automatic metadata sanitization.
   * Fails safely without interrupting core authentication logic if logging fails.
   */
  public static async recordEvent(
    data: CreateSecurityEventInput,
    tx?: Prisma.TransactionClient
  ): Promise<void> {
    try {
      const sanitizedData: CreateSecurityEventInput = {
        userId: data.userId || null,
        type: data.type,
        ipAddress: data.ipAddress || null,
        userAgent: data.userAgent ? data.userAgent.slice(0, 500) : null,
        metadata: sanitizeMetadata(data.metadata)
      };

      await SecurityEventRepository.create(sanitizedData, tx);
      logger.info(
        `Security Event Recorded: [${data.type}] for user ${data.userId || 'anonymous'}`
      );
    } catch (error) {
      // Audit failure must not crash or bypass authentication logic
      logger.error(`Failed to persist security event [${data.type}]:`, error);
    }
  }
}
