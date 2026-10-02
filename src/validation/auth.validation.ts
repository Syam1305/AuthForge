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

export const phoneRegisterSchema = z.object({
  phoneNumber: z
    .string({ required_error: 'Phone number is required.' })
    .trim()
    .min(5, 'Phone number must be at least 5 characters.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(128, 'Password must not exceed 128 characters.')
    .optional(),
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

export const verifyPhoneSchema = z.object({
  phoneNumber: z
    .string({ required_error: 'Phone number is required.' })
    .trim()
    .min(5, 'Phone number must be at least 5 characters.'),
  otp: z
    .string({ required_error: 'OTP is required.' })
    .regex(/^\d{6}$/, 'OTP must be exactly 6 digits.')
});

export const resendPhoneVerificationSchema = z.object({
  phoneNumber: z
    .string({ required_error: 'Phone number is required.' })
    .trim()
    .min(5, 'Phone number must be at least 5 characters.')
});

export const phoneLoginRequestSchema = z.object({
  phoneNumber: z
    .string({ required_error: 'Phone number is required.' })
    .trim()
    .min(5, 'Phone number must be at least 5 characters.')
});

export const phoneLoginVerifySchema = z.object({
  phoneNumber: z
    .string({ required_error: 'Phone number is required.' })
    .trim()
    .min(5, 'Phone number must be at least 5 characters.'),
  otp: z
    .string({ required_error: 'OTP is required.' })
    .regex(/^\d{6}$/, 'OTP must be exactly 6 digits.')
});

export const phonePasswordLoginSchema = z.object({
  phoneNumber: z
    .string({ required_error: 'Phone number is required.' })
    .trim()
    .min(5, 'Phone number must be at least 5 characters.'),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(1, 'Password is required.')
});

export const phonePasswordResetRequestSchema = z.object({
  phoneNumber: z
    .string({ required_error: 'Phone number is required.' })
    .trim()
    .min(5, 'Phone number must be at least 5 characters.')
});

export const phonePasswordResetVerifySchema = z.object({
  phoneNumber: z
    .string({ required_error: 'Phone number is required.' })
    .trim()
    .min(5, 'Phone number must be at least 5 characters.'),
  otp: z
    .string({ required_error: 'OTP is required.' })
    .regex(/^\d{6}$/, 'OTP must be exactly 6 digits.')
});

export const phoneChangeRequestSchema = z.object({
  newPhoneNumber: z
    .string({ required_error: 'New phone number is required.' })
    .trim()
    .min(5, 'Phone number must be at least 5 characters.')
});

export const phoneChangeVerifySchema = z.object({
  newPhoneNumber: z
    .string({ required_error: 'New phone number is required.' })
    .trim()
    .min(5, 'Phone number must be at least 5 characters.'),
  otp: z
    .string({ required_error: 'OTP is required.' })
    .regex(/^\d{6}$/, 'OTP must be exactly 6 digits.')
});

export const googleAuthSchema = z.object({
  credential: z
    .string({ required_error: 'Google credential is required.' })
    .trim()
    .min(1, 'Google credential cannot be empty.')
});

export const googleLinkSchema = z.object({
  credential: z
    .string({ required_error: 'Google credential is required.' })
    .trim()
    .min(1, 'Google credential cannot be empty.')
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type PhoneRegisterInput = z.infer<typeof phoneRegisterSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PhonePasswordLoginInput = z.infer<typeof phonePasswordLoginSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type VerifyPhoneInput = z.infer<typeof verifyPhoneSchema>;
export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>;
export type ResendPhoneVerificationInput = z.infer<typeof resendPhoneVerificationSchema>;
export type PhoneLoginRequestInput = z.infer<typeof phoneLoginRequestSchema>;
export type PhoneLoginVerifyInput = z.infer<typeof phoneLoginVerifySchema>;
export type PasswordResetRequestInput = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetVerifyInput = z.infer<typeof passwordResetVerifySchema>;
export type PasswordResetCompleteInput = z.infer<typeof passwordResetCompleteSchema>;
export type PhonePasswordResetRequestInput = z.infer<typeof phonePasswordResetRequestSchema>;
export type PhonePasswordResetVerifyInput = z.infer<typeof phonePasswordResetVerifySchema>;
export type PhoneChangeRequestInput = z.infer<typeof phoneChangeRequestSchema>;
export type PhoneChangeVerifyInput = z.infer<typeof phoneChangeVerifySchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
export type SessionIdParamInput = z.infer<typeof sessionIdParamSchema>;
export type GoogleAuthInput = z.infer<typeof googleAuthSchema>;
export type GoogleLinkInput = z.infer<typeof googleLinkSchema>;



