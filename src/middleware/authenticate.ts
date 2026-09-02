import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../services/token.service.js';
import { SessionService } from '../services/session.service.js';
import { AuthRequiredError, InvalidAccessTokenError } from '../errors/app.error.js';

export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AuthRequiredError('Authorization header is missing.');
    }

    const [scheme, token] = authHeader.trim().split(/\s+/);

    if (scheme?.toLowerCase() !== 'bearer' || !token) {
      throw new InvalidAccessTokenError('Authorization header must use Bearer scheme.');
    }

    // 1. Cryptographically verify signature, algorithm, audience, issuer, expiration
    const payload = TokenService.verifyAccessToken(token);

    // 2. Validate that the session is active and not revoked/expired server-side
    await SessionService.validateSession(payload.sessionId, payload.userId);

    // 3. Attach safe authenticated principal context
    req.auth = {
      userId: payload.userId,
      sessionId: payload.sessionId,
      tokenId: payload.tokenId
    };

    // 4. Asynchronously update session activity timestamp (non-blocking)
    SessionService.touchSession(payload.sessionId).catch(() => {});

    next();
  } catch (error) {
    next(error);
  }
}
