import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

// Extend Express Request interface to include custom id property
declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

// Allowed request ID characters: alphanumeric, hyphen, underscore (max 64 chars)
const SAFE_REQUEST_ID_REGEX = /^[a-zA-Z0-9_-]{1,64}$/;

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const incomingId = req.headers['x-request-id'];
  let requestId: string;

  if (typeof incomingId === 'string' && SAFE_REQUEST_ID_REGEX.test(incomingId.trim())) {
    requestId = incomingId.trim();
  } else {
    requestId = randomUUID();
  }

  req.id = requestId;
  res.setHeader('X-Request-ID', requestId);
  next();
}
