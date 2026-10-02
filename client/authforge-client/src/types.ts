export interface User {
  id: string;
  email: string | null;
  phoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  isActive: boolean;
  emailVerifiedAt: string | null;
  phoneNumberVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
}

export interface RegisterResponse {
  user: User;
}

export interface Session {
  id: string;
  ipAddress: string | null;
  userAgent: string | null;
  lastUsedAt: string;
  createdAt: string;
  isCurrent: boolean;
  isRevoked: boolean;
}

export interface SecurityStatus {
  email: string | null;
  emailVerified: boolean;
  emailVerifiedAt: string | null;
  phoneNumber: string | null;
  phoneVerified: boolean;
  phoneNumberVerifiedAt: string | null;
  activeSessions: number;
  passwordUpdatedAt: string;
  accountLocked: boolean;
  lockedUntil: string | null;
  failedLoginAttempts: number;
}

export interface MessageResponse {
  message: string;
}

export interface VerificationResponse {
  verified: boolean;
  message?: string;
}

export interface EmailVerificationResponse {
  verified: boolean;
  message?: string;
}

export interface PasswordResetVerifyResponse {
  resetToken: string;
  message?: string;
}

export interface ApiErrorDetail {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiErrorDetail;
}

export interface RegisterParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface PhoneRegisterParams {
  phoneNumber: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface PhonePasswordLoginParams {
  phoneNumber: string;
  password: string;
}

export interface ChangePasswordParams {
  currentPassword: string;
  newPassword: string;
}

export interface AuthForgeClientOptions {
  baseUrl: string;
  timeoutMs?: number;
  tokenStorage?: import('./token-storage.js').TokenStorage;
  autoRestore?: boolean;
}
