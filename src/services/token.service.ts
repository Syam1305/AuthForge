import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import {
  InvalidAccessTokenError,
  AccessTokenExpiredError
} from '../errors/app.error.js';
import { logger } from '../utils/logger.js';

export interface AccessTokenPayload {
  userId: string;
  sessionId: string;
  tokenId: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
}

export interface AccessTokenResult {
  accessToken: string;
  expiresIn: number; // Expiration duration in seconds
  tokenId: string;
}

export class TokenService {
  private static readonly ALGORITHM: jwt.Algorithm = 'HS256';

  /**
   * Parses duration string (e.g., '15m', '1h', '900s') or number to seconds.
   */
  public static parseTtlToSeconds(ttl: string | number): number {
    if (typeof ttl === 'number') return ttl;
    const match = ttl.match(/^(\d+)([smhd])?$/);
    if (!match) return 900; // default 15 minutes
    const val = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
      case 's': return val;
      case 'm': return val * 60;
      case 'h': return val * 3600;
      case 'd': return val * 86400;
      default: return val;
    }
  }

  /**
   * Generates a short-lived signed JWT access token.
   */
  public static createAccessToken(payload: {
    userId: string;
    sessionId: string;
  }): AccessTokenResult {
    const tokenId = crypto.randomUUID();
    const expiresInSeconds = this.parseTtlToSeconds(env.ACCESS_TOKEN_TTL);

    const tokenClaims = {
      sub: payload.userId,
      sid: payload.sessionId,
      jti: tokenId
    };

    const accessToken = jwt.sign(tokenClaims, env.JWT_ACCESS_SECRET, {
      algorithm: this.ALGORITHM,
      issuer: env.ACCESS_TOKEN_ISSUER,
      audience: env.ACCESS_TOKEN_AUDIENCE,
      expiresIn: expiresInSeconds
    });

    return {
      accessToken,
      expiresIn: expiresInSeconds,
      tokenId
    };
  }

  /**
   * Cryptographically verifies a JWT access token signature, algorithm, audience, and issuer.
   */
  public static verifyAccessToken(token: string): AccessTokenPayload {
    try {
      const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET, {
        algorithms: [this.ALGORITHM],
        issuer: env.ACCESS_TOKEN_ISSUER,
        audience: env.ACCESS_TOKEN_AUDIENCE
      }) as jwt.JwtPayload;

      if (!decoded.sub || !decoded.sid || !decoded.jti) {
        throw new InvalidAccessTokenError('Token is missing required claims.');
      }

      return {
        userId: decoded.sub as string,
        sessionId: decoded.sid as string,
        tokenId: decoded.jti as string,
        iss: decoded.iss as string,
        aud: decoded.aud as string,
        iat: decoded.iat as number,
        exp: decoded.exp as number
      };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AccessTokenExpiredError();
      }
      if (error instanceof jwt.JsonWebTokenError) {
        logger.warn(`JWT verification failed: ${error.message}`);
        throw new InvalidAccessTokenError();
      }
      if (error instanceof InvalidAccessTokenError) {
        throw error;
      }
      logger.error('Unexpected error during JWT verification:', error);
      throw new InvalidAccessTokenError();
    }
  }

  /**
   * Generates a high-entropy cryptographically random refresh token.
   */
  public static generateRefreshToken(): string {
    return crypto.randomBytes(32).toString('base64url');
  }

  /**
   * Computes a deterministic SHA-256 hash of a refresh token for storage.
   */
  public static hashRefreshToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * Generates a unique family ID for a refresh token chain.
   */
  public static generateFamilyId(): string {
    return crypto.randomUUID();
  }

  /**
   * Calculates the expiration Date for a refresh token based on configured TTL in days.
   */
  public static calculateRefreshTokenExpiry(): Date {
    const days = env.REFRESH_TOKEN_TTL_DAYS;
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }
}
