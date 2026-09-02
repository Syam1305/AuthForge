import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .trim()
    .min(1, 'Email cannot be empty.')
    .email('Invalid email address format.')
    .toLowerCase(),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(8, 'Password must be at least 8 characters long.')
    .max(128, 'Password must not exceed 128 characters.'),
  firstName: z
    .string()
    .trim()
    .min(1, 'First name cannot be empty.')
    .max(50, 'First name must not exceed 50 characters.')
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name cannot be empty.')
    .max(50, 'Last name must not exceed 50 characters.')
    .optional()
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .trim()
    .min(1, 'Email cannot be empty.')
    .email('Invalid email address format.')
    .toLowerCase(),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(1, 'Password is required.')
});

export const verifyEmailSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .trim()
    .min(1, 'Email cannot be empty.')
    .email('Invalid email address format.')
    .toLowerCase(),
  otp: z
    .string({ required_error: 'OTP is required.' })
    .regex(/^\d{6}$/, 'OTP must be exactly 6 digits.')
});

export const resendVerificationSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .trim()
    .min(1, 'Email cannot be empty.')
    .email('Invalid email address format.')
    .toLowerCase()
});

export const passwordResetRequestSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .trim()
    .min(1, 'Email cannot be empty.')
    .email('Invalid email address format.')
    .toLowerCase()
});

export const passwordResetVerifySchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .trim()
    .min(1, 'Email cannot be empty.')
    .email('Invalid email address format.')
    .toLowerCase(),
  otp: z
    .string({ required_error: 'OTP is required.' })
    .regex(/^\d{6}$/, 'OTP must be exactly 6 digits.')
});

export const passwordResetCompleteSchema = z.object({
  resetToken: z
    .string({ required_error: 'Reset token is required.' })
    .min(1, 'Reset token cannot be empty.'),
  newPassword: z
    .string({ required_error: 'New password is required.' })
    .min(8, 'Password must be at least 8 characters long.')
    .max(128, 'Password must not exceed 128 characters.')
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string({ required_error: 'Current password is required.' })
    .min(1, 'Current password is required.'),
  newPassword: z
    .string({ required_error: 'New password is required.' })
    .min(8, 'Password must be at least 8 characters long.')
    .max(128, 'Password must not exceed 128 characters.')
});

export const refreshSchema = z.object({
  refreshToken: z
    .string({ required_error: 'Refresh token is required.' })
    .min(1, 'Refresh token cannot be empty.')
});

export const sessionIdParamSchema = z.object({
  sessionId: z
    .string({ required_error: 'Session ID is required.' })
    .uuid('Session ID must be a valid UUID.')
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>;
export type PasswordResetRequestInput = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetVerifyInput = z.infer<typeof passwordResetVerifySchema>;
export type PasswordResetCompleteInput = z.infer<typeof passwordResetCompleteSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
export type SessionIdParamInput = z.infer<typeof sessionIdParamSchema>;


