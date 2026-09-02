import dotenv from 'dotenv';
import { z } from 'zod';
import { logger } from '../utils/logger.js';

// Load environment variables from .env file
dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z
    .string({ required_error: 'DATABASE_URL environment variable is required.' })
    .min(1, 'DATABASE_URL cannot be empty.')
    .refine(
      (val) => val.startsWith('postgresql://') || val.startsWith('postgres://'),
      {
        message: 'DATABASE_URL must be a valid PostgreSQL connection string starting with postgresql:// or postgres://'
      }
    ),
  PORT: z
    .string()
    .default('4000')
    .transform((val) => parseInt(val, 10))
    .refine((port) => !isNaN(port) && port > 0 && port <= 65535, {
      message: 'PORT must be a valid integer between 1 and 65535.'
    }),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  TRUST_PROXY: z
    .string()
    .default('1'),
  CORS_ORIGIN: z
    .string()
    .default('http://localhost:3000'),
  OTP_SECRET: z
    .string()
    .default('authforge-default-otp-hmac-secret-phase3'),
  JWT_ACCESS_SECRET: z
    .string()
    .min(32, 'JWT_ACCESS_SECRET must be at least 32 characters long.')
    .default('authforge-development-access-token-secret-minimum-32-bytes!'),
  ACCESS_TOKEN_ISSUER: z
    .string()
    .default('authforge'),
  ACCESS_TOKEN_AUDIENCE: z
    .string()
    .default('authforge-api'),
  ACCESS_TOKEN_TTL: z
    .string()
    .default('15m'),
  REFRESH_TOKEN_TTL_DAYS: z
    .string()
    .default('7')
    .transform((val) => parseInt(val, 10))
    .refine((days) => !isNaN(days) && days > 0, {
      message: 'REFRESH_TOKEN_TTL_DAYS must be a positive integer.'
    }),
  LOGIN_MAX_FAILED_ATTEMPTS: z
    .string()
    .default('5')
    .transform((val) => parseInt(val, 10))
    .refine((attempts) => !isNaN(attempts) && attempts > 0, {
      message: 'LOGIN_MAX_FAILED_ATTEMPTS must be a positive integer.'
    }),
  LOGIN_LOCKOUT_MINUTES: z
    .string()
    .default('15')
    .transform((val) => parseInt(val, 10))
    .refine((mins) => !isNaN(mins) && mins > 0, {
      message: 'LOGIN_LOCKOUT_MINUTES must be a positive integer.'
    }),
  SECURITY_EVENT_RETENTION_DAYS: z
    .string()
    .default('90')
    .transform((val) => parseInt(val, 10))
    .refine((days) => !isNaN(days) && days > 0, {
      message: 'SECURITY_EVENT_RETENTION_DAYS must be a positive integer.'
    })
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    logger.error('Environment validation failed with the following errors:');
    for (const issue of result.error.issues) {
      logger.error(`  - ${issue.path.join('.')}: ${issue.message}`);
    }
    logger.error('Server cannot start with invalid configuration. Exiting process.');
    process.exit(1);
  }

  return result.data;
}

export const env = validateEnv();
