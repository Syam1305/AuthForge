export class AuthForgeError extends Error {
  public readonly code: string;
  public readonly statusCode?: number;
  public readonly details?: unknown;

  constructor(message: string, code = 'AUTHFORGE_ERROR', statusCode?: number, details?: unknown) {
    super(message);
    this.name = 'AuthForgeError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends AuthForgeError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AuthForgeError {
  constructor(message: string, code = 'UNAUTHENTICATED', statusCode = 401, details?: unknown) {
    super(message, code, statusCode, details);
    this.name = 'AuthenticationError';
  }
}

export class SessionRevokedError extends AuthenticationError {
  constructor(message = 'Session has been revoked.', code = 'SESSION_REVOKED') {
    super(message, code, 401);
    this.name = 'SessionRevokedError';
  }
}

export class AuthorizationError extends AuthForgeError {
  constructor(message: string, code = 'FORBIDDEN', statusCode = 403, details?: unknown) {
    super(message, code, statusCode, details);
    this.name = 'AuthorizationError';
  }
}

export class AccountLockedError extends AuthorizationError {
  constructor(message = 'Account is temporarily locked due to excessive failed attempts.') {
    super(message, 'ACCOUNT_LOCKED', 403);
    this.name = 'AccountLockedError';
  }
}

export class NotFoundError extends AuthForgeError {
  constructor(message = 'Resource not found.', code = 'NOT_FOUND') {
    super(message, code, 404);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends AuthForgeError {
  constructor(message = 'Too many requests. Please try again later.') {
    super(message, 'RATE_LIMITED', 429);
    this.name = 'RateLimitError';
  }
}

export class NetworkError extends AuthForgeError {
  constructor(message = 'Network connection failed.') {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'NetworkError';
  }
}

export class ServerError extends AuthForgeError {
  constructor(message = 'AuthForge server error occurred.', code = 'SERVER_ERROR', statusCode = 500) {
    super(message, code, statusCode);
    this.name = 'ServerError';
  }
}

export function parseApiError(status: number, errorData?: { code?: string; message?: string; details?: unknown }): AuthForgeError {
  const code = errorData?.code || 'UNKNOWN_ERROR';
  const message = errorData?.message || `HTTP ${status} request failed`;
  const details = errorData?.details;

  if (status === 400) {
    return new ValidationError(message, details);
  }
  if (status === 401) {
    if (code === 'SESSION_REVOKED' || code === 'REFRESH_TOKEN_REUSED') {
      return new SessionRevokedError(message, code);
    }
    return new AuthenticationError(message, code, status, details);
  }
  if (status === 403) {
    if (code === 'ACCOUNT_LOCKED') {
      return new AccountLockedError(message);
    }
    return new AuthorizationError(message, code, status, details);
  }
  if (status === 404) {
    return new NotFoundError(message, code);
  }
  if (status === 429) {
    return new RateLimitError(message);
  }
  if (status >= 500) {
    return new ServerError(message, code, status);
  }

  return new AuthForgeError(message, code, status, details);
}
