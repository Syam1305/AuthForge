import { Request, Response, NextFunction } from 'express';
import {
  registerSchema,
  phoneRegisterSchema,
  loginSchema,
  phonePasswordLoginSchema,
  verifyEmailSchema,
  verifyPhoneSchema,
  resendVerificationSchema,
  resendPhoneVerificationSchema,
  phoneLoginRequestSchema,
  phoneLoginVerifySchema,
  passwordResetRequestSchema,
  passwordResetVerifySchema,
  passwordResetCompleteSchema,
  phonePasswordResetRequestSchema,
  phonePasswordResetVerifySchema,
  phoneChangeRequestSchema,
  phoneChangeVerifySchema,
  changePasswordSchema,
  refreshSchema,
  sessionIdParamSchema,
  googleAuthSchema,
  googleLinkSchema
} from '../validation/auth.validation.js';
import { UserService } from '../services/user.service.js';
import { GoogleAuthService } from '../services/google-auth.service.js';
import { PasswordResetService } from '../services/password-reset.service.js';
import { SessionService } from '../services/session.service.js';
import { DevelopmentOtpDeliveryProvider } from '../providers/otp-delivery.provider.js';
import { DevelopmentSmsDeliveryProvider } from '../providers/sms-delivery.provider.js';
import { AuthRequiredError, NotFoundError } from '../errors/app.error.js';
import { PhoneUtil } from '../utils/phone.js';

function getRequestMetadata(req: Request) {
  return {
    ipAddress: (req.ip || req.socket.remoteAddress || null) as string | null,
    userAgent: (req.headers['user-agent'] as string) || null
  };
}

export class AuthController {
  /**
   * Handles POST /api/v1/auth/register (Email registration)
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
   * Handles POST /api/v1/auth/phone/register (Phone registration)
   */
  public static async registerWithPhone(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = phoneRegisterSchema.parse(req.body);
      const user = await UserService.registerWithPhone(validatedInput, getRequestMetadata(req));

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
   * Handles POST /api/v1/auth/login (Email + Password)
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
   * Handles POST /api/v1/auth/phone/login (Phone + Password)
   */
  public static async loginWithPhone(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = phonePasswordLoginSchema.parse(req.body);
      const result = await UserService.loginWithPhone(validatedInput, getRequestMetadata(req));

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
   * Handles POST /api/v1/auth/phone/login/request (Passwordless Phone OTP request)
   */
  public static async requestPhoneLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = phoneLoginRequestSchema.parse(req.body);
      const result = await UserService.requestPhoneLogin(validatedInput.phoneNumber);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles POST /api/v1/auth/phone/login/verify (Passwordless Phone OTP verification)
   */
  public static async verifyPhoneLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = phoneLoginVerifySchema.parse(req.body);
      const result = await UserService.verifyPhoneLogin(
        validatedInput.phoneNumber,
        validatedInput.otp,
        getRequestMetadata(req)
      );

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
   * Handles POST /api/v1/auth/phone/verification/verify (Verify Phone Number)
   */
  public static async verifyPhone(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = verifyPhoneSchema.parse(req.body);
      const result = await UserService.verifyPhone(
        validatedInput.phoneNumber,
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
   * Handles POST /api/v1/auth/phone/verification/resend (Resend Phone OTP)
   */
  public static async resendPhoneVerification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = resendPhoneVerificationSchema.parse(req.body);
      const result = await UserService.resendPhoneVerificationOtp(validatedInput.phoneNumber);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles POST /api/v1/auth/phone/password-reset/request (Phone Password Reset Request)
   */
  public static async requestPhonePasswordReset(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = phonePasswordResetRequestSchema.parse(req.body);
      const result = await PasswordResetService.requestPhoneReset(validatedInput.phoneNumber);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles POST /api/v1/auth/phone/password-reset/verify (Phone Password Reset Verify)
   */
  public static async verifyPhonePasswordReset(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = phonePasswordResetVerifySchema.parse(req.body);
      const result = await PasswordResetService.verifyPhoneResetOtp(
        validatedInput.phoneNumber,
        validatedInput.otp
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
   * Handles POST /api/v1/auth/phone/change/request (Authenticated User Phone Change Request)
   */
  public static async requestPhoneChange(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.auth) {
        throw new AuthRequiredError();
      }

      const validatedInput = phoneChangeRequestSchema.parse(req.body);
      const result = await UserService.requestPhoneChange(req.auth.userId, validatedInput.newPhoneNumber);

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles POST /api/v1/auth/phone/change/verify (Authenticated User Phone Change Verify)
   */
  public static async verifyPhoneChange(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.auth) {
        throw new AuthRequiredError();
      }

      const validatedInput = phoneChangeVerifySchema.parse(req.body);
      const result = await UserService.verifyPhoneChange(
        req.auth.userId,
        validatedInput.newPhoneNumber,
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
   * Handles POST /api/v1/auth/verification/verify (Email)
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
   * Handles POST /api/v1/auth/verification/resend (Email)
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
   * Handles POST /api/v1/auth/password-reset/request (Email)
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
   * Handles POST /api/v1/auth/password-reset/verify (Email)
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

  /**
   * Development-only helper endpoint to inspect captured dev Email OTP.
   * Strictly disabled in production.
   */
  public static async getDevOtp(req: Request, res: Response): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Not found' }
      });
      return;
    }

    const email = req.query.email as string;
    const type = (req.query.type as 'verify' | 'reset') || 'verify';

    if (!email) {
      res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Email query parameter is required.' }
      });
      return;
    }

    const otp = DevelopmentOtpDeliveryProvider.getDevOtp(type, email.trim().toLowerCase());
    if (!otp) {
      res.status(404).json({
        success: false,
        error: { code: 'OTP_NOT_FOUND', message: 'No active dev OTP found for this email.' }
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        email: email.trim().toLowerCase(),
        type,
        otp,
        mode: 'development_only'
      }
    });
  }

  /**
   * Development-only helper endpoint to inspect captured dev SMS OTP.
   * Strictly disabled in production.
   */
  public static async getDevSmsOtp(req: Request, res: Response): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Not found' }
      });
      return;
    }

    const phoneNumber = req.query.phoneNumber as string;
    const type = (req.query.type as 'verify' | 'login' | 'reset') || 'verify';

    if (!phoneNumber) {
      res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'phoneNumber query parameter is required.' }
      });
      return;
    }

    let normalizedPhone: string;
    try {
      normalizedPhone = PhoneUtil.normalize(phoneNumber);
    } catch {
      normalizedPhone = phoneNumber.trim();
    }

    const otp = DevelopmentSmsDeliveryProvider.getDevSmsOtp(type, normalizedPhone);
    if (!otp) {
      res.status(404).json({
        success: false,
        error: { code: 'OTP_NOT_FOUND', message: 'No active dev SMS OTP found for this phone number.' }
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        phoneNumber: normalizedPhone,
        type,
        otp,
        mode: 'development_only'
      }
    });
  }

  /**
   * Handles POST /api/v1/auth/google ("Continue with Google")
   */
  public static async googleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedInput = googleAuthSchema.parse(req.body);
      const result = await GoogleAuthService.authenticateWithGoogle(
        validatedInput.credential,
        getRequestMetadata(req)
      );

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
   * Handles POST /api/v1/auth/identities/google/link (Explicit authenticated Google linking)
   */
  public static async linkGoogle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.auth?.userId) {
        throw new AuthRequiredError('Authentication required to link Google identity.');
      }

      const validatedInput = googleLinkSchema.parse(req.body);
      const result = await GoogleAuthService.linkGoogleIdentity(
        req.auth.userId,
        validatedInput.credential,
        getRequestMetadata(req)
      );

      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }
}
