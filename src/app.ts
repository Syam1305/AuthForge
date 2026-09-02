import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import { requestIdMiddleware } from './middleware/requestId.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { appRouter } from './routes/index.js';
import { logger } from './utils/logger.js';

export function createApp(): Express {
  const app = express();

  // 1. Reverse Proxy Trust Configuration
  if (env.TRUST_PROXY === 'false' || env.TRUST_PROXY === '0') {
    app.set('trust proxy', false);
  } else if (env.TRUST_PROXY === 'true' || env.TRUST_PROXY === '1') {
    app.set('trust proxy', 1);
  } else if (!isNaN(Number(env.TRUST_PROXY))) {
    app.set('trust proxy', Number(env.TRUST_PROXY));
  } else {
    app.set('trust proxy', env.TRUST_PROXY);
  }

  // 2. HTTP Security Headers (API-hardened)
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'none'"],
          frameAncestors: ["'none'"]
        }
      },
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      frameguard: { action: 'deny' },
      hidePoweredBy: true,
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
      },
      noSniff: true,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
    })
  );

  // 3. CORS Configuration
  const rawOrigins = env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean);
  const isWildcard = rawOrigins.includes('*');

  if (env.NODE_ENV === 'production' && isWildcard) {
    logger.warn('CORS security warning: Wildcard "*" is configured for CORS_ORIGIN in production.');
  }

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);
        if (isWildcard || rawOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error(`Origin ${origin} is not allowed by CORS policy`));
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
      exposedHeaders: ['X-Request-ID'],
      credentials: true,
      maxAge: 86400 // 24 hours preflight cache
    })
  );

  // 4. Request Body Limits & Parameter Limits
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true, limit: '100kb', parameterLimit: 100 }));

  // 5. Request ID Middleware
  app.use(requestIdMiddleware);

  // 6. HTTP Request Logging Middleware
  app.use((req, res, next) => {
    const startTime = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`, {
        requestId: req.id
      });
    });
    next();
  });

  // 7. Application Routes
  app.use(appRouter);

  // 8. 404 Handler
  app.use(notFoundHandler);

  // 9. Centralized Error Handler
  app.use(errorHandler);

  return app;
}

export const app = createApp();
