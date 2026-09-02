import { Request, Response, NextFunction } from 'express';
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  resendVerificationSchema,
  passwordResetRequestSchema,
  passwordResetVerifySchema,
  passwordResetCompleteSchema,
  changePasswordSchema,
  refreshSchema,
  sessionIdParamSchema
} from '../validation/auth.validation.js';
import { UserService } from '../services/user.service.js';
import { PasswordResetService } from '../services/password-reset.service.js';
import { SessionService } from '../services/session.service.js';
import { AuthRequiredError, NotFoundError } from '../errors/app.error.js';

function getRequestMetadata(req: Request) {
  return {
    ipAddress: (req.ip || req.socket.remoteAddress || null) as string | null,
    userAgent: (req.headers['user-agent'] as string) || null
  };
}

export class AuthController {
  /**
   * Handles POST /api/v1/auth/register
   */
  public static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = registerSchema.parse(req.body);
      const user = await UserService.register(validatedInput, getRequestMetadata(req));

      res.status(201).json({
        success: true,
        data: {
          user
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles POST /api/v1/auth/login
   */
  public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = loginSchema.parse(req.body);
      const result = await UserService.login(validatedInput, getRequestMetadata(req));

      res.status(200).json({
        success: true,
        data: {
          user: result.user,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          tokenType: result.tokenType,
          expiresIn: result.expiresIn
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles POST /api/v1/auth/refresh
   */
  public static async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = refreshSchema.parse(req.body);
      const result = await SessionService.rotateRefreshToken(
        validatedInput.refreshToken,
        getRequestMetadata(req)
      );

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles POST /api/v1/auth/logout
   */
  public static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.auth) {
        throw new AuthRequiredError();
      }

      const result = await SessionService.revokeSession(
        req.auth.sessionId,
        req.auth.userId,
        'LOGOUT',
        getRequestMetadata(req)
      );

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles POST /api/v1/auth/logout-all
   */
  public static async logoutAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.auth) {
        throw new AuthRequiredError();
      }

      const result = await SessionService.revokeAllSessions(
        req.auth.userId,
        'LOGOUT_ALL',
        undefined,
        getRequestMetadata(req)
      );

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles GET /api/v1/auth/me
   */
  public static async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.auth) {
        throw new AuthRequiredError();
      }

      const user = await UserService.findById(req.auth.userId);

      if (!user) {
        throw new NotFoundError('User not found.');
      }

      res.status(200).json({
        success: true,
        data: {
          user
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles GET /api/v1/auth/sessions
   */
  public static async listSessions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.auth) {
        throw new AuthRequiredError();
      }

      const sessions = await SessionService.listSessions(req.auth.userId, req.auth.sessionId);

      res.status(200).json({
        success: true,
        data: {
          sessions
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles DELETE /api/v1/auth/sessions/:sessionId
   */
  public static async revokeSession(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.auth) {
        throw new AuthRequiredError();
      }

      const validatedParams = sessionIdParamSchema.parse(req.params);
      const result = await SessionService.revokeSession(
        validatedParams.sessionId,
        req.auth.userId,
        'SESSION_REVOKED',
        getRequestMetadata(req)
      );

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles POST /api/v1/auth/change-password
   */
  public static async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.auth) {
        throw new AuthRequiredError();
      }

      const validatedInput = changePasswordSchema.parse(req.body);
      const result = await UserService.changePassword(
        req.auth.userId,
        validatedInput,
        getRequestMetadata(req)
      );

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles GET /api/v1/auth/security
   */
  public static async getSecurityStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.auth) {
        throw new AuthRequiredError();
      }

      const securityStatus = await UserService.getSecurityStatus(req.auth.userId);

      res.status(200).json({
        success: true,
        data: securityStatus
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles POST /api/v1/auth/verification/verify
   */
  public static async verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = verifyEmailSchema.parse(req.body);
      const result = await UserService.verifyEmail(
        validatedInput.email,
        validatedInput.otp,
        getRequestMetadata(req)
      );

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles POST /api/v1/auth/verification/resend
   */
  public static async resendVerification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = resendVerificationSchema.parse(req.body);
      const result = await UserService.resendVerificationOtp(validatedInput.email);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles POST /api/v1/auth/password-reset/request
   */
  public static async requestPasswordReset(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = passwordResetRequestSchema.parse(req.body);
      const result = await PasswordResetService.requestReset(validatedInput.email);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles POST /api/v1/auth/password-reset/verify
   */
  public static async verifyPasswordReset(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = passwordResetVerifySchema.parse(req.body);
      const result = await PasswordResetService.verifyResetOtp(validatedInput.email, validatedInput.otp);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles POST /api/v1/auth/password-reset/complete
   */
  public static async completePasswordReset(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = passwordResetCompleteSchema.parse(req.body);
      const result = await PasswordResetService.completePasswordReset(
        validatedInput.resetToken,
        validatedInput.newPassword
      );

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}
