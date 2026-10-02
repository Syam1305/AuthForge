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
    }),
  // Optional SMTP Email Delivery (e.g. Gmail SMTP)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 587))
    .refine((port) => !isNaN(port) && port > 0 && port <= 65535, {
      message: 'SMTP_PORT must be a valid integer between 1 and 65535.'
    }),
  SMTP_SECURE: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM: z.string().default('AuthForge <no-reply@authforge.dev>'),

  // SMS Delivery Provider Configuration
  SMS_PROVIDER: z
    .enum(['development', 'msg91', 'twilio'])
    .default('development'),
  // Twilio / Generic REST Gateway
  SMS_API_KEY: z.string().optional(),
  SMS_API_SECRET: z.string().optional(),
  SMS_ACCOUNT_SID: z.string().optional(),
  SMS_AUTH_TOKEN: z.string().optional(),
  SMS_FROM: z.string().optional(),

  // MSG91 SendOTP V5 Delivery Configuration
  MSG91_AUTH_KEY: z.string().optional(),
  MSG91_TEMPLATE_ID: z.string().optional(),
  MSG91_VERIFY_TEMPLATE_ID: z.string().optional(),
  MSG91_LOGIN_TEMPLATE_ID: z.string().optional(),
  MSG91_RESET_TEMPLATE_ID: z.string().optional(),

  // Google Authentication Configuration (Phase 10)
  GOOGLE_AUTH_ENABLED: z
    .string()
    .optional()
    .transform((val) => val === 'true')
    .default('false'),
  GOOGLE_CLIENT_ID: z.string().optional()
}).superRefine((data, ctx) => {
  if (data.NODE_ENV === 'production') {
    if (data.GOOGLE_AUTH_ENABLED) {
      if (!data.GOOGLE_CLIENT_ID || data.GOOGLE_CLIENT_ID.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['GOOGLE_CLIENT_ID'],
          message: 'GOOGLE_CLIENT_ID is required in production when GOOGLE_AUTH_ENABLED is true.'
        });
      }
    }
    if (data.SMS_PROVIDER === 'msg91') {
      if (!data.MSG91_AUTH_KEY || data.MSG91_AUTH_KEY.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['MSG91_AUTH_KEY'],
          message: 'MSG91_AUTH_KEY is required in production when SMS_PROVIDER=msg91.'
        });
      }
      if (!data.MSG91_TEMPLATE_ID || data.MSG91_TEMPLATE_ID.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['MSG91_TEMPLATE_ID'],
          message: 'MSG91_TEMPLATE_ID is required in production when SMS_PROVIDER=msg91.'
        });
      }
    } else if (data.SMS_PROVIDER === 'twilio') {
      const apiKey = data.SMS_API_KEY || data.SMS_ACCOUNT_SID;
      const apiSecret = data.SMS_API_SECRET || data.SMS_AUTH_TOKEN;
      if (!apiKey || apiKey.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['SMS_API_KEY'],
          message: 'SMS_API_KEY or SMS_ACCOUNT_SID is required in production when SMS_PROVIDER=twilio.'
        });
      }
      if (!apiSecret || apiSecret.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['SMS_API_SECRET'],
          message: 'SMS_API_SECRET or SMS_AUTH_TOKEN is required in production when SMS_PROVIDER=twilio.'
        });
      }
    }
  }
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

