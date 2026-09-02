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

const passwordResetLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 10
});

const changePasswordLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 10
});

// Phase 2 Routes
router.post('/register', AuthController.register);
router.post('/login', loginLimiter, AuthController.login);

// Phase 3 Email Verification Routes
router.post('/verification/verify', otpRateLimiter, AuthController.verifyEmail);
router.post('/verification/resend', otpRateLimiter, AuthController.resendVerification);

// Phase 3 Password Reset / Recovery Routes
router.post('/password-reset/request', passwordResetLimiter, AuthController.requestPasswordReset);
router.post('/password-reset/verify', passwordResetLimiter, AuthController.verifyPasswordReset);
router.post('/password-reset/complete', passwordResetLimiter, AuthController.completePasswordReset);

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

export const authRoutes = router;
