import { Request, Response, NextFunction } from 'express';
import { RateLimitError } from '../errors/app.error.js';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

export function createRateLimiter(options: { windowMs: number; maxRequests: number }) {
  const store = new Map<string, RateLimitRecord>();

  // Periodically clean up expired records to prevent unbounded memory growth
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      if (now > record.resetTime) {
        store.delete(key);
      }
    }
  }, 60000).unref();

  return (req: Request, _res: Response, next: NextFunction): void => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
    const key = `${req.path}:${ip}`;
    const now = Date.now();

    const record = store.get(key);

    if (!record || now > record.resetTime) {
      store.set(key, {
        count: 1,
        resetTime: now + options.windowMs
      });
      return next();
    }

    if (record.count >= options.maxRequests) {
      return next(
        new RateLimitError(
          `Too many requests. Please try again after ${Math.ceil(
            (record.resetTime - now) / 1000
          )} seconds.`
        )
      );
    }

    record.count += 1;
    return next();
  };
}
