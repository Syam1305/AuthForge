import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { AppError } from '../errors/app.error.js';
import { logger } from '../utils/logger.js';

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  // 1. Handle custom AppError
  if (err instanceof AppError) {
    logger.warn(
      `HTTP ${req.method} ${req.originalUrl} - ${err.statusCode} - [${err.code}] ${err.message}`,
      { requestId: req.id }
    );

    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(err.details ? { details: err.details } : {})
      }
    });
    return;
  }

  // 2. Handle Zod Validation Errors
  if (err instanceof ZodError) {
    const formattedIssues = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message
    }));

    logger.warn(
      `HTTP ${req.method} ${req.originalUrl} - 400 - [VALIDATION_ERROR] Request schema validation failed`,
      { requestId: req.id, issues: formattedIssues }
    );

    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request data.',
        details: formattedIssues
      }
    });
    return;
  }

  // 3. Handle malformed JSON body from client
  if (err instanceof SyntaxError && 'status' in err && (err as { status: number }).status === 400 && 'body' in err) {
    logger.warn(
      `HTTP ${req.method} ${req.originalUrl} - 400 - [INVALID_JSON] Malformed JSON payload`,
      { requestId: req.id }
    );

    res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_JSON',
        message: 'Malformed JSON payload.'
      }
    });
    return;
  }

  // 4. Handle Prisma Known Request Errors (e.g. unique constraint race condition)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      logger.warn(
        `HTTP ${req.method} ${req.originalUrl} - 409 - [EMAIL_ALREADY_EXISTS] Unique constraint violation caught`,
        { requestId: req.id }
      );

      res.status(409).json({
        success: false,
        error: {
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'An account with this email already exists.'
        }
      });
      return;
    }
  }

  // 5. Handle generic unhandled errors (500)
  const isProd = process.env.NODE_ENV === 'production';
  logger.error(
    `HTTP ${req.method} ${req.originalUrl} - 500 - ${err.message}`,
    err,
    { requestId: req.id }
  );

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: isProd ? 'An unexpected error occurred.' : (err.message || 'An unexpected error occurred.')
    }
  });
}
