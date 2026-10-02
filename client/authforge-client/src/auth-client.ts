import {
  User,
  AuthTokens,
  LoginResponse,
  RegisterResponse,
  Session,
  SecurityStatus,
  MessageResponse,
  VerificationResponse,
  EmailVerificationResponse,
  PasswordResetVerifyResponse,
  RegisterParams,
  PhoneRegisterParams,
  LoginParams,
  PhonePasswordLoginParams,
  ChangePasswordParams,
  AuthForgeClientOptions
} from './types.js';
import { HttpClient, HttpRequestOptions } from './http-client.js';
import { TokenStorage, InMemoryTokenStorage } from './token-storage.js';
import { AuthStateManager } from './auth-state.js';
import { AuthenticationError } from './errors.js';

export class AuthForgeClient {
  private httpClient: HttpClient;
  private tokenStorage: TokenStorage;
  private authState: AuthStateManager;
  private refreshPromise: Promise<AuthTokens> | null = null;

  constructor(options: AuthForgeClientOptions) {
    this.httpClient = new HttpClient(options.baseUrl, options.timeoutMs);
    this.tokenStorage = options.tokenStorage || new InMemoryTokenStorage();
    this.authState = new AuthStateManager();

    if (options.autoRestore !== false) {
      // Asynchronously attempt session restoration
      this.init().catch(() => {});
    }
  }

  /**
   * Returns the reactive authentication state manager.
   */
  public get state(): AuthStateManager {
    return this.authState;
  }

  /**
   * Initializes client state from stored credentials.
   */
  public async init(): Promise<User | null> {
    this.authState.setLoading();
    try {
      const tokens = await this.tokenStorage.getTokens();
      if (!tokens?.refreshToken) {
        this.authState.setUnauthenticated();
        return null;
      }

      // Restore user details via /me
      const user = await this.getMe();
      return user;
    } catch {
      await this.handleAuthFailure();
      return null;
    }
  }

  /**
   * Registers a new user account with email and password.
   */
  public async register(params: RegisterParams): Promise<RegisterResponse> {
    const data = await this.httpClient.request<{ user: User }>('/api/v1/auth/register', {
      method: 'POST',
      body: params
    });

    return data;
  }

  /**
   * Registers a new user account with phone number.
   */
  public async registerWithPhone(params: PhoneRegisterParams): Promise<RegisterResponse> {
    const data = await this.httpClient.request<{ user: User }>('/api/v1/auth/phone/register', {
      method: 'POST',
      body: params
    });

    return data;
  }

  /**
   * Authenticates user with email and password.
   * Atomically stores tokens and updates auth state.
   */
  public async login(params: LoginParams): Promise<LoginResponse> {
    const data = await this.httpClient.request<LoginResponse>('/api/v1/auth/login', {
      method: 'POST',
      body: params
    });

    await this.tokenStorage.saveTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      tokenType: data.tokenType,
      expiresIn: data.expiresIn
    });

    this.authState.setAuthenticated(data.user);
    return data;
  }

  /**
   * Authenticates user with phone number and password.
   */
  public async loginWithPhone(params: PhonePasswordLoginParams): Promise<LoginResponse> {
    const data = await this.httpClient.request<LoginResponse>('/api/v1/auth/phone/login', {
      method: 'POST',
      body: params
    });

    await this.tokenStorage.saveTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      tokenType: data.tokenType,
      expiresIn: data.expiresIn
    });

    this.authState.setAuthenticated(data.user);
    return data;
  }

  /**
   * Requests a passwordless 6-digit OTP code to the provided phone number.
   */
  public async requestPhoneLogin(phoneNumber: string): Promise<MessageResponse> {
    return await this.httpClient.request<MessageResponse>('/api/v1/auth/phone/login/request', {
      method: 'POST',
      body: { phoneNumber }
    });
  }

  /**
   * Verifies a passwordless phone OTP and receives access/refresh tokens.
   */
  public async verifyPhoneLogin(phoneNumber: string, otp: string): Promise<LoginResponse> {
    const data = await this.httpClient.request<LoginResponse>('/api/v1/auth/phone/login/verify', {
      method: 'POST',
      body: { phoneNumber, otp }
    });

    await this.tokenStorage.saveTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      tokenType: data.tokenType,
      expiresIn: data.expiresIn
    });

    this.authState.setAuthenticated(data.user);
    return data;
  }

  /**
   * Verifies a phone number with a 6-digit OTP code.
   */
  public async verifyPhone(phoneNumber: string, otp: string): Promise<VerificationResponse> {
    return await this.httpClient.request<VerificationResponse>('/api/v1/auth/phone/verification/verify', {
      method: 'POST',
      body: { phoneNumber, otp }
    });
  }

  /**
   * Requests resend of a phone verification OTP code.
   */
  public async resendPhoneVerification(phoneNumber: string): Promise<MessageResponse> {
    return await this.httpClient.request<MessageResponse>('/api/v1/auth/phone/verification/resend', {
      method: 'POST',
      body: { phoneNumber }
    });
  }

  /**
   * Requests a password reset OTP for a phone number.
   */
  public async requestPhonePasswordReset(phoneNumber: string): Promise<MessageResponse> {
    return await this.httpClient.request<MessageResponse>('/api/v1/auth/phone/password-reset/request', {
      method: 'POST',
      body: { phoneNumber }
    });
  }

  /**
   * Verifies a password reset OTP for a phone number and receives a reset token.
   */
  public async verifyPhonePasswordReset(phoneNumber: string, otp: string): Promise<PasswordResetVerifyResponse> {
    return await this.httpClient.request<PasswordResetVerifyResponse>('/api/v1/auth/phone/password-reset/verify', {
      method: 'POST',
      body: { phoneNumber, otp }
    });
  }

  /**
   * Authenticated user requests changing their phone number.
   */
  public async requestPhoneChange(newPhoneNumber: string): Promise<MessageResponse> {
    return await this.authenticatedRequest<MessageResponse>('/api/v1/auth/phone/change/request', {
      method: 'POST',
      body: { newPhoneNumber }
    });
  }

  /**
   * Authenticated user verifies and confirms their new phone number with an OTP.
   */
  public async verifyPhoneChange(newPhoneNumber: string, otp: string): Promise<MessageResponse> {
    return await this.authenticatedRequest<MessageResponse>('/api/v1/auth/phone/change/verify', {
      method: 'POST',
      body: { newPhoneNumber, otp }
    });
  }

  /**
   * Single-flight Refresh Token Rotation.
   * Ensures multiple concurrent 401s trigger exactly ONE network refresh call.
   */
  public async refresh(): Promise<AuthTokens> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.executeRefresh();
    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async executeRefresh(): Promise<AuthTokens> {
    const currentTokens = await this.tokenStorage.getTokens();

    if (!currentTokens?.refreshToken) {
      await this.handleAuthFailure();
      throw new AuthenticationError('No refresh token available.', 'NO_REFRESH_TOKEN');
    }

    try {
      const data = await this.httpClient.request<AuthTokens>('/api/v1/auth/refresh', {
        method: 'POST',
        body: { refreshToken: currentTokens.refreshToken }
      });

      const newTokens: AuthTokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        tokenType: 'Bearer',
        expiresIn: data.expiresIn
      };

      await this.tokenStorage.saveTokens(newTokens);
      return newTokens;
    } catch (error) {
      await this.handleAuthFailure();
      throw error;
    }
  }

  /**
   * Executes an authenticated request with automatic token attachment and transparent single-flight refresh retry.
   */
  public async authenticatedRequest<T>(path: string, options: HttpRequestOptions = {}): Promise<T> {
    let tokens = await this.tokenStorage.getTokens();

    if (!tokens?.accessToken) {
      tokens = await this.refresh();
    }

    try {
      return await this.httpClient.request<T>(path, {
        ...options,
        token: tokens.accessToken
      });
    } catch (error) {
      // If access token was expired/invalid, attempt transparent refresh once
      if (error instanceof AuthenticationError && error.code !== 'SESSION_REVOKED') {
        const refreshedTokens = await this.refresh();
        return await this.httpClient.request<T>(path, {
          ...options,
          token: refreshedTokens.accessToken
        });
      }
      throw error;
    }
  }

  /**
   * Fetches currently authenticated user profile.
   */
  public async getMe(): Promise<User> {
    const data = await this.authenticatedRequest<{ user: User }>('/api/v1/auth/me');
    this.authState.setAuthenticated(data.user);
    return data.user;
  }

  /**
   * Logs out the current session and purges local token storage.
   */
  public async logout(): Promise<void> {
    try {
      await this.authenticatedRequest<MessageResponse>('/api/v1/auth/logout', {
        method: 'POST'
      });
    } catch {
      // Local tokens are cleared regardless of server network reachability
    } finally {
      await this.handleAuthFailure();
    }
  }

  /**
   * Logs out all active sessions across all devices for the current user.
   */
  public async logoutAll(): Promise<void> {
    try {
      await this.authenticatedRequest<MessageResponse>('/api/v1/auth/logout-all', {
        method: 'POST'
      });
    } finally {
      await this.handleAuthFailure();
    }
  }

  /**
   * Lists active sessions for current user.
   */
  public async listSessions(): Promise<Session[]> {
    const data = await this.authenticatedRequest<{ sessions: Session[] }>('/api/v1/auth/sessions');
    return data.sessions;
  }

  /**
   * Revokes a specific session by ID.
   */
  public async revokeSession(sessionId: string): Promise<MessageResponse> {
    return await this.authenticatedRequest<MessageResponse>(`/api/v1/auth/sessions/${sessionId}`, {
      method: 'DELETE'
    });
  }

  /**
   * Changes account password and invalidates local tokens (server revokes all sessions).
   */
  public async changePassword(params: ChangePasswordParams): Promise<MessageResponse> {
    const result = await this.authenticatedRequest<MessageResponse>('/api/v1/auth/change-password', {
      method: 'POST',
      body: params
    });

    // Server revokes all active sessions upon password change
    await this.handleAuthFailure();
    return result;
  }

  /**
   * Retrieves security overview and lockout status.
   */
  public async getSecurityStatus(): Promise<SecurityStatus> {
    return await this.authenticatedRequest<SecurityStatus>('/api/v1/auth/security');
  }

  /**
   * Verifies email using 6-digit OTP.
   */
  public async verifyEmail(email: string, otp: string): Promise<EmailVerificationResponse> {
    return await this.httpClient.request<EmailVerificationResponse>('/api/v1/auth/verification/verify', {
      method: 'POST',
      body: { email, otp }
    });
  }

  /**
   * Requests resend of email verification OTP.
   */
  public async resendVerification(email: string): Promise<MessageResponse> {
    return await this.httpClient.request<MessageResponse>('/api/v1/auth/verification/resend', {
      method: 'POST',
      body: { email }
    });
  }

  /**
   * Requests a password reset OTP.
   */
  public async requestPasswordReset(email: string): Promise<MessageResponse> {
    return await this.httpClient.request<MessageResponse>('/api/v1/auth/password-reset/request', {
      method: 'POST',
      body: { email }
    });
  }

  /**
   * Verifies password reset OTP and receives reset token.
   */
  public async verifyPasswordResetOtp(email: string, otp: string): Promise<PasswordResetVerifyResponse> {
    return await this.httpClient.request<PasswordResetVerifyResponse>('/api/v1/auth/password-reset/verify', {
      method: 'POST',
      body: { email, otp }
    });
  }

  /**
   * Completes password reset with reset token and new password.
   */
  public async completePasswordReset(resetToken: string, newPassword: string): Promise<MessageResponse> {
    const result = await this.httpClient.request<MessageResponse>('/api/v1/auth/password-reset/complete', {
      method: 'POST',
      body: { resetToken, newPassword }
    });

    await this.handleAuthFailure();
    return result;
  }

  /**
   * Authenticates user using a Google ID token ("Continue with Google").
   * Atomically stores tokens and updates auth state.
   */
  public async loginWithGoogle(credential: string): Promise<LoginResponse> {
    const data = await this.httpClient.request<LoginResponse>('/api/v1/auth/google', {
      method: 'POST',
      body: { credential }
    });

    await this.tokenStorage.saveTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      tokenType: data.tokenType,
      expiresIn: data.expiresIn
    });

    this.authState.setAuthenticated(data.user);
    return data;
  }

  /**
   * Explicitly links a Google account to current authenticated user.
   */
  public async linkGoogle(credential: string): Promise<MessageResponse> {
    return await this.authenticatedRequest<MessageResponse>('/api/v1/auth/identities/google/link', {
      method: 'POST',
      body: { credential }
    });
  }

  /**
   * Internal helper to clean up local storage and update auth state to unauthenticated.
   */
  private async handleAuthFailure(): Promise<void> {
    await this.tokenStorage.clearTokens();
    this.authState.setUnauthenticated();
  }
}

