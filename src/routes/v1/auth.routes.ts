import { Router } from 'express';
import { AuthController } from '../../controllers/auth.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import { createRateLimiter } from '../../middleware/rateLimiter.js';

const router = Router();

// Rate limiters for sensitive authentication endpoints (in-memory sliding window)
const loginLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute window
  maxRequests: 100     // max 100 login attempts per minute per IP
});

const refreshLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 100     // max 100 token refreshes per minute per IP
});

const otpRateLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 10
});

const phoneRateLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 10
});

const passwordResetLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 10
});

const changePasswordLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 10
});

// Phase 2 Email Authentication Routes
router.post('/register', AuthController.register);
router.post('/login', loginLimiter, AuthController.login);

// Phase 3 Email Verification Routes
router.post('/verification/verify', otpRateLimiter, AuthController.verifyEmail);
router.post('/verification/resend', otpRateLimiter, AuthController.resendVerification);

// Phase 3 Email Password Reset / Recovery Routes
router.post('/password-reset/request', passwordResetLimiter, AuthController.requestPasswordReset);
router.post('/password-reset/verify', passwordResetVerifySchemaRoute(), AuthController.verifyPasswordReset);
router.post('/password-reset/complete', passwordResetLimiter, AuthController.completePasswordReset);

function passwordResetVerifySchemaRoute() {
  return passwordResetLimiter;
}

// Phase 9 Phone Authentication & SMS OTP Routes
router.post('/phone/register', AuthController.registerWithPhone);
router.post('/phone/login', loginLimiter, AuthController.loginWithPhone);
router.post('/phone/login/request', phoneRateLimiter, AuthController.requestPhoneLogin);
router.post('/phone/login/verify', phoneRateLimiter, AuthController.verifyPhoneLogin);
router.post('/phone/verification/verify', phoneRateLimiter, AuthController.verifyPhone);
router.post('/phone/verification/resend', phoneRateLimiter, AuthController.resendPhoneVerification);
router.post('/phone/password-reset/request', phoneRateLimiter, AuthController.requestPhonePasswordReset);
router.post('/phone/password-reset/verify', phoneRateLimiter, AuthController.verifyPhonePasswordReset);
router.post('/phone/change/request', authenticate, phoneRateLimiter, AuthController.requestPhoneChange);
router.post('/phone/change/verify', authenticate, phoneRateLimiter, AuthController.verifyPhoneChange);

// Phase 10 Google Authentication & Account Linking Routes
router.post('/google', loginLimiter, AuthController.googleLogin);
router.post('/identities/google/link', authenticate, otpRateLimiter, AuthController.linkGoogle);

// Phase 4 Session & Token Management Routes
router.post('/refresh', refreshLimiter, AuthController.refresh);
router.post('/logout', authenticate, AuthController.logout);
router.post('/logout-all', authenticate, AuthController.logoutAll);
router.get('/me', authenticate, AuthController.getMe);
router.get('/sessions', authenticate, AuthController.listSessions);
router.delete('/sessions/:sessionId', authenticate, AuthController.revokeSession);

// Phase 5 Account Security & Hardening Routes
router.post('/change-password', authenticate, changePasswordLimiter, AuthController.changePassword);
router.get('/security', authenticate, AuthController.getSecurityStatus);

// Development Sandbox Helper Routes (Strictly disabled in production)
if (process.env.NODE_ENV !== 'production') {
  router.get('/dev/otp', AuthController.getDevOtp);
  router.get('/dev/sms-otp', AuthController.getDevSmsOtp);
}

export const authRoutes = router;
