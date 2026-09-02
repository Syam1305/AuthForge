export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(message: string, statusCode = 500, code = 'INTERNAL_SERVER_ERROR', details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed.', details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Invalid email or password.') {
    super(message, 401, 'INVALID_CREDENTIALS');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'This account is inactive.', code = 'ACCOUNT_INACTIVE') {
    super(message, 403, code);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'An account with this email already exists.', code = 'EMAIL_ALREADY_EXISTS') {
    super(message, 409, code);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found.', code = 'NOT_FOUND') {
    super(message, 404, code);
  }
}

export class OtpInvalidError extends AppError {
  constructor(message = 'Invalid verification code.', code = 'OTP_INVALID') {
    super(message, 400, code);
  }
}

export class OtpExpiredError extends AppError {
  constructor(message = 'Verification code has expired.', code = 'OTP_EXPIRED') {
    super(message, 400, code);
  }
}

export class OtpMaxAttemptsError extends AppError {
  constructor(message = 'Maximum verification attempts exceeded. Please request a new code.', code = 'OTP_MAX_ATTEMPTS') {
    super(message, 400, code);
  }
}

export class OtpAlreadyUsedError extends AppError {
  constructor(message = 'Verification code has already been used.', code = 'OTP_ALREADY_USED') {
    super(message, 400, code);
  }
}

export class OtpResendCooldownError extends AppError {
  constructor(message = 'Please wait before requesting another code.', code = 'OTP_RESEND_COOLDOWN') {
    super(message, 429, code);
  }
}

export class EmailAlreadyVerifiedError extends AppError {
  constructor(message = 'Email address is already verified.', code = 'EMAIL_ALREADY_VERIFIED') {
    super(message, 400, code);
  }
}

export class ResetTokenInvalidError extends AppError {
  constructor(message = 'Invalid password reset token.', code = 'RESET_TOKEN_INVALID') {
    super(message, 400, code);
  }
}

export class ResetTokenExpiredError extends AppError {
  constructor(message = 'Password reset token has expired.', code = 'RESET_TOKEN_EXPIRED') {
    super(message, 400, code);
  }
}

export class ResetTokenAlreadyUsedError extends AppError {
  constructor(message = 'Password reset token has already been used.', code = 'RESET_TOKEN_ALREADY_USED') {
    super(message, 400, code);
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Too many requests. Please try again later.', code = 'TOO_MANY_REQUESTS') {
    super(message, 429, code);
  }
}

export class AuthRequiredError extends AppError {
  constructor(message = 'Authentication token is required.', code = 'AUTH_REQUIRED') {
    super(message, 401, code);
  }
}

export class InvalidAccessTokenError extends AppError {
  constructor(message = 'Invalid access token.', code = 'INVALID_ACCESS_TOKEN') {
    super(message, 401, code);
  }
}

export class AccessTokenExpiredError extends AppError {
  constructor(message = 'Access token has expired.', code = 'ACCESS_TOKEN_EXPIRED') {
    super(message, 401, code);
  }
}

export class SessionRevokedError extends AppError {
  constructor(message = 'Session has been revoked.', code = 'SESSION_REVOKED') {
    super(message, 401, code);
  }
}

export class SessionExpiredError extends AppError {
  constructor(message = 'Session has expired.', code = 'SESSION_EXPIRED') {
    super(message, 401, code);
  }
}

export class SessionNotFoundError extends AppError {
  constructor(message = 'Session not found.', code = 'SESSION_NOT_FOUND') {
    super(message, 404, code);
  }
}

export class SessionForbiddenError extends AppError {
  constructor(message = 'You do not have permission to manage this session.', code = 'SESSION_FORBIDDEN') {
    super(message, 403, code);
  }
}

export class InvalidRefreshTokenError extends AppError {
  constructor(message = 'Invalid refresh token.', code = 'INVALID_REFRESH_TOKEN') {
    super(message, 401, code);
  }
}

export class RefreshTokenExpiredError extends AppError {
  constructor(message = 'Refresh token has expired.', code = 'REFRESH_TOKEN_EXPIRED') {
    super(message, 401, code);
  }
}

export class RefreshTokenReusedError extends AppError {
  constructor(
    message = 'Refresh token reuse detected. Session and token family have been revoked.',
    code = 'REFRESH_TOKEN_REUSED'
  ) {
    super(message, 401, code);
  }
}

export class CurrentPasswordInvalidError extends AppError {
  constructor(message = 'Current password is incorrect.', code = 'CURRENT_PASSWORD_INVALID') {
    super(message, 400, code);
  }
}

export class PasswordSameAsCurrentError extends AppError {
  constructor(
    message = 'New password must be different from current password.',
    code = 'PASSWORD_SAME_AS_CURRENT'
  ) {
    super(message, 400, code);
  }
}

export class AccountLockedError extends AppError {
  constructor(
    message = 'Account is temporarily locked due to excessive failed login attempts. Please try again later.',
    code = 'ACCOUNT_LOCKED'
  ) {
    super(message, 403, code);
  }
}

export class AccountDisabledError extends AppError {
  constructor(message = 'This account has been disabled.', code = 'ACCOUNT_DISABLED') {
    super(message, 403, code);
  }
}


