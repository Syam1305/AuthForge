// LoginLab — Frontend Single-Page Application Client

class LoginLabApp {
  constructor() {
    this.baseUrl = 'http://localhost:4000';
    this.accessToken = null;
    this.refreshToken = null;
    this.currentUser = null;
    this.pendingEmail = null;
    this.pendingPassword = null;
    this.pendingPhone = null;
    this.pendingPhonePassword = null;
    this.pendingPhoneMode = 'login'; // 'login' | 'verify'
    this.resetMode = 'email'; // 'email' | 'phone'
    this.resetToken = null;
    this.resendCooldownTimer = null;
    this.resendPhoneCooldownTimer = null;
    this.refreshPromise = null;
    this.googleClientId = '';
    this.googleAuthEnabled = false;
  }

  async init() {
    try {
      const configRes = await fetch('/api/config');
      if (configRes.ok) {
        const configData = await configRes.json();
        if (configData.authforgeBaseUrl) {
          this.baseUrl = configData.authforgeBaseUrl.replace(/\/+$/, '');
        }
        if (configData.googleClientId) {
          this.googleClientId = configData.googleClientId;
        }
        if (configData.googleAuthEnabled !== undefined) {
          this.googleAuthEnabled = Boolean(configData.googleAuthEnabled);
        }
      }
    } catch {
      // Use default fallback
    }

    this.setupGoogleIdentityServices();
    this.bindEvents();
    this.restoreSession();
  }

  // --- 1. TOKEN STORAGE & RECOVERY ---
  restoreSession() {
    const raw = localStorage.getItem('loginlab_auth_tokens');
    if (!raw) {
      this.setAuthState('unauthenticated');
      this.switchView('login');
      return;
    }

    try {
      const tokens = JSON.parse(raw);
      this.accessToken = tokens.accessToken;
      this.refreshToken = tokens.refreshToken;
      this.loadDashboard();
    } catch {
      this.clearTokens();
      this.setAuthState('unauthenticated');
      this.switchView('login');
    }
  }

  saveTokens(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('loginlab_auth_tokens', JSON.stringify({ accessToken, refreshToken }));
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    this.currentUser = null;
    localStorage.removeItem('loginlab_auth_tokens');
  }

  setAuthState(state) {
    const dot = document.querySelector('.status-dot');
    const label = document.getElementById('status-label');
    if (state === 'authenticated') {
      dot?.classList.add('online');
      if (label) label.textContent = 'Authenticated';
    } else if (state === 'loading') {
      dot?.classList.remove('online');
      if (label) label.textContent = 'Loading...';
    } else {
      dot?.classList.remove('online');
      if (label) label.textContent = 'Unauthenticated';
    }
  }

  // --- 2. HTTP CLIENT & SINGLE-FLIGHT REFRESH ---
  async request(path, options = {}) {
    const url = `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    if (options.token) {
      headers['Authorization'] = `Bearer ${options.token}`;
    }

    const response = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch {}

    if (!response.ok || (payload && payload.success === false)) {
      const err = new Error(payload?.error?.message || `HTTP ${response.status}`);
      err.code = payload?.error?.code || 'UNKNOWN_ERROR';
      err.status = response.status;
      throw err;
    }

    return payload.data;
  }

  async authenticatedRequest(path, options = {}) {
    if (!this.accessToken) {
      await this.refreshTokens();
    }

    try {
      return await this.request(path, { ...options, token: this.accessToken });
    } catch (error) {
      if (error.status === 401 && error.code !== 'SESSION_REVOKED') {
        await this.refreshTokens();
        return await this.request(path, { ...options, token: this.accessToken });
      }
      throw error;
    }
  }

  async refreshTokens() {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      if (!this.refreshToken) {
        this.handleAuthFailure();
        throw new Error('No refresh token available');
      }

      try {
        const data = await this.request('/api/v1/auth/refresh', {
          method: 'POST',
          body: { refreshToken: this.refreshToken }
        });

        this.saveTokens(data.accessToken, data.refreshToken);
        return data;
      } catch (err) {
        this.handleAuthFailure();
        throw err;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  handleAuthFailure() {
    this.clearTokens();
    this.setAuthState('unauthenticated');
    this.switchView('login');
  }

  // --- 3. VIEW ROUTING & TOASTS ---
  switchView(viewName) {
    document.querySelectorAll('.view-section').forEach((el) => el.classList.remove('active'));
    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.classList.add('active');
    }
  }

  toast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4500);
  }

  // --- 4. EVENT BINDINGS ---
  bindEvents() {
    // Navigation Links
    document.getElementById('link-to-register')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('register');
    });

    document.getElementById('link-to-login')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('login');
    });

    document.getElementById('link-back-to-login')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('login');
    });

    document.getElementById('link-phone-back-to-login')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('login');
    });

    document.getElementById('link-forgot-password')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('forgot');
    });

    document.getElementById('link-forgot-phone-password')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('forgot');
      document.getElementById('tab-forgot-phone')?.click();
    });

    document.getElementById('link-forgot-to-login')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('login');
    });

    // Tab Buttons (Login Email / Phone)
    const tabLoginEmail = document.getElementById('tab-login-email');
    const tabLoginPhone = document.getElementById('tab-login-phone');
    const formLogin = document.getElementById('form-login');
    const formLoginPhone = document.getElementById('form-login-phone');

    tabLoginEmail?.addEventListener('click', () => {
      tabLoginEmail.classList.add('active');
      tabLoginPhone?.classList.remove('active');
      formLogin?.classList.add('active');
      formLoginPhone?.classList.remove('active');
    });

    tabLoginPhone?.addEventListener('click', () => {
      tabLoginPhone.classList.add('active');
      tabLoginEmail?.classList.remove('active');
      formLoginPhone?.classList.add('active');
      formLogin?.classList.remove('active');
    });

    // Radio: Phone Auth Mode (OTP vs Password)
    const modePhoneOtp = document.getElementById('mode-phone-otp');
    const modePhonePass = document.getElementById('mode-phone-password');
    const groupPhonePass = document.getElementById('group-login-phone-password');
    const btnLoginPhone = document.getElementById('btn-login-phone');

    modePhoneOtp?.addEventListener('change', () => {
      if (modePhoneOtp.checked) {
        groupPhonePass?.classList.add('hidden');
        if (btnLoginPhone) btnLoginPhone.querySelector('.btn-text').textContent = 'Send Sign-in Code';
      }
    });

    modePhonePass?.addEventListener('change', () => {
      if (modePhonePass.checked) {
        groupPhonePass?.classList.remove('hidden');
        if (btnLoginPhone) btnLoginPhone.querySelector('.btn-text').textContent = 'Sign In with Password';
      }
    });

    // Tab Buttons (Register Email / Phone)
    const tabRegEmail = document.getElementById('tab-reg-email');
    const tabRegPhone = document.getElementById('tab-reg-phone');
    const formRegister = document.getElementById('form-register');
    const formRegisterPhone = document.getElementById('form-register-phone');

    tabRegEmail?.addEventListener('click', () => {
      tabRegEmail.classList.add('active');
      tabRegPhone?.classList.remove('active');
      formRegister?.classList.add('active');
      formRegisterPhone?.classList.remove('active');
    });

    tabRegPhone?.addEventListener('click', () => {
      tabRegPhone.classList.add('active');
      tabRegEmail?.classList.remove('active');
      formRegisterPhone?.classList.add('active');
      formRegister?.classList.remove('active');
    });

    // Tab Buttons (Forgot Email / Phone)
    const tabForgotEmail = document.getElementById('tab-forgot-email');
    const tabForgotPhone = document.getElementById('tab-forgot-phone');
    const formForgot = document.getElementById('form-forgot');
    const formForgotPhone = document.getElementById('form-forgot-phone');

    tabForgotEmail?.addEventListener('click', () => {
      tabForgotEmail.classList.add('active');
      tabForgotPhone?.classList.remove('active');
      formForgot?.classList.add('active');
      formForgotPhone?.classList.remove('active');
      this.resetMode = 'email';
    });

    tabForgotPhone?.addEventListener('click', () => {
      tabForgotPhone.classList.add('active');
      tabForgotEmail?.classList.remove('active');
      formForgotPhone?.classList.add('active');
      formForgot?.classList.remove('active');
      this.resetMode = 'phone';
    });

    // Form Submissions
    document.getElementById('form-login')?.addEventListener('submit', () => this.handleEmailLogin());
    document.getElementById('form-login-phone')?.addEventListener('submit', () => this.handlePhoneLogin());
    document.getElementById('form-register')?.addEventListener('submit', () => this.handleEmailRegister());
    document.getElementById('form-register-phone')?.addEventListener('submit', () => this.handlePhoneRegister());
    document.getElementById('form-verify-email')?.addEventListener('submit', () => this.handleVerifyEmailOtp());
    document.getElementById('form-verify-phone')?.addEventListener('submit', () => this.handleVerifyPhoneOtp());
    document.getElementById('form-forgot')?.addEventListener('submit', () => this.handleEmailForgot());
    document.getElementById('form-forgot-phone')?.addEventListener('submit', () => this.handlePhoneForgot());
    document.getElementById('form-reset-verify')?.addEventListener('submit', () => this.handleVerifyResetOtp());
    document.getElementById('form-reset-complete')?.addEventListener('submit', () => this.handleCompleteReset());

    // Resend OTP Buttons
    document.getElementById('btn-resend-otp')?.addEventListener('click', () => this.handleResendEmailOtp());
    document.getElementById('btn-resend-phone-otp')?.addEventListener('click', () => this.handleResendPhoneOtp());

    // Dev OTP Helper Buttons
    document.getElementById('btn-fetch-dev-otp')?.addEventListener('click', () => this.fetchDevEmailOtp('verify'));
    document.getElementById('btn-fetch-dev-sms-otp')?.addEventListener('click', () => this.fetchDevSmsOtp());
    document.getElementById('btn-fetch-dev-reset-otp')?.addEventListener('click', () => this.fetchDevResetOtp());

    // Dashboard Buttons
    document.getElementById('btn-logout')?.addEventListener('click', () => this.handleLogout());
    document.getElementById('btn-logout-all')?.addEventListener('click', () => this.handleLogoutAll());
    document.getElementById('form-change-password')?.addEventListener('submit', () => this.handleChangePassword());
    document.getElementById('form-change-phone')?.addEventListener('submit', () => this.handleRequestPhoneChange());
    document.getElementById('form-verify-phone-change')?.addEventListener('submit', () => this.handleVerifyPhoneChange());
  }

  // --- 4B. UI HELPERS & COOLDOWNS ---
  setButtonLoading(button, isLoading, loadingText) {
    if (!button) return;
    button.disabled = isLoading;
    const btnText = button.querySelector('.btn-text');
    if (isLoading) {
      if (!button.dataset.originalText && btnText) {
        button.dataset.originalText = btnText.textContent;
      }
      if (btnText) btnText.textContent = loadingText || 'Loading...';
      button.classList.add('loading');
    } else {
      if (btnText && button.dataset.originalText) {
        btnText.textContent = button.dataset.originalText;
      }
      button.classList.remove('loading');
    }
  }

  startResendCooldown(durationSeconds = 60) {
    if (this.resendCooldownTimer) {
      clearInterval(this.resendCooldownTimer);
      this.resendCooldownTimer = null;
    }

    const resendBtn = document.getElementById('btn-resend-otp');
    const timerLabel = document.getElementById('resend-timer');
    if (!resendBtn) return;

    let remaining = durationSeconds;
    resendBtn.disabled = true;

    const updateLabel = () => {
      if (timerLabel) {
        timerLabel.textContent = `(resend in ${remaining}s)`;
      }
    };

    updateLabel();

    this.resendCooldownTimer = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(this.resendCooldownTimer);
        this.resendCooldownTimer = null;
        resendBtn.disabled = false;
        if (timerLabel) {
          timerLabel.textContent = '';
        }
      } else {
        updateLabel();
      }
    }, 1000);
  }

  startResendPhoneCooldown(durationSeconds = 60) {
    if (this.resendPhoneCooldownTimer) {
      clearInterval(this.resendPhoneCooldownTimer);
      this.resendPhoneCooldownTimer = null;
    }

    const resendBtn = document.getElementById('btn-resend-phone-otp');
    const timerLabel = document.getElementById('resend-phone-timer');
    if (!resendBtn) return;

    let remaining = durationSeconds;
    resendBtn.disabled = true;

    const updateLabel = () => {
      if (timerLabel) {
        timerLabel.textContent = `(resend in ${remaining}s)`;
      }
    };

    updateLabel();

    this.resendPhoneCooldownTimer = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(this.resendPhoneCooldownTimer);
        this.resendPhoneCooldownTimer = null;
        resendBtn.disabled = false;
        if (timerLabel) {
          timerLabel.textContent = '';
        }
      } else {
        updateLabel();
      }
    }, 1000);
  }

  // --- 5. AUTHENTICATION ACTIONS ---

  // --- 5A. GOOGLE IDENTITY SERVICES (GIS) INTEGRATION ---
  setupGoogleIdentityServices() {
    const isConfigured = Boolean(this.googleAuthEnabled && this.googleClientId);

    const loginNote = document.getElementById('google-disabled-note-login');
    const regNote = document.getElementById('google-disabled-note-register');

    if (!isConfigured) {
      if (loginNote) loginNote.classList.remove('hidden');
      if (regNote) regNote.classList.remove('hidden');
      return;
    }

    if (loginNote) loginNote.classList.add('hidden');
    if (regNote) regNote.classList.add('hidden');

    const tryInitGis = () => {
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: this.googleClientId,
            callback: (res) => this.handleGoogleCallback(res),
            auto_select: false,
            cancel_on_tap_outside: true
          });

          const loginBtnWrapper = document.getElementById('google-btn-login');
          if (loginBtnWrapper) {
            window.google.accounts.id.renderButton(loginBtnWrapper, {
              theme: 'filled_black',
              size: 'large',
              text: 'continue_with',
              shape: 'rectangular',
              width: 320
            });
          }

          const regBtnWrapper = document.getElementById('google-btn-register');
          if (regBtnWrapper) {
            window.google.accounts.id.renderButton(regBtnWrapper, {
              theme: 'filled_black',
              size: 'large',
              text: 'signup_with',
              shape: 'rectangular',
              width: 320
            });
          }

          const linkBtnWrapper = document.getElementById('google-btn-link');
          if (linkBtnWrapper) {
            window.google.accounts.id.renderButton(linkBtnWrapper, {
              theme: 'outline',
              size: 'medium',
              text: 'continue_with',
              shape: 'rectangular',
              width: 240
            });
          }
        } catch (e) {
          console.warn('GIS button render error:', e);
        }
      } else {
        setTimeout(tryInitGis, 250);
      }
    };

    tryInitGis();
  }

  async handleGoogleCallback(response) {
    if (!response?.credential) {
      this.toast('No Google credential received.', 'error');
      return;
    }

    const isDashboardActive = document.getElementById('view-dashboard')?.classList.contains('active');
    if (isDashboardActive && this.accessToken) {
      await this.handleGoogleLink(response.credential);
    } else {
      await this.handleGoogleLogin(response.credential);
    }
  }

  async handleGoogleLogin(credential) {
    this.setAuthState('loading');
    try {
      const data = await this.request('/api/v1/auth/google', {
        method: 'POST',
        body: { credential }
      });

      this.saveTokens(data.accessToken, data.refreshToken);
      this.toast('Signed in with Google successfully!', 'success');
      this.loadDashboard();
    } catch (error) {
      this.setAuthState('unauthenticated');
      if (error.code === 'GOOGLE_LINK_REQUIRED') {
        this.toast(
          'An account with this email already exists. Please sign in with your email/password and link your Google account in Security settings.',
          'warning'
        );
      } else {
        this.toast(error.message || 'Google sign-in failed.', 'error');
      }
    }
  }

  async handleGoogleLink(credential) {
    try {
      const result = await this.authenticatedRequest('/api/v1/auth/identities/google/link', {
        method: 'POST',
        body: { credential }
      });

      this.toast(result.message || 'Google account linked successfully!', 'success');
      this.loadDashboard();
    } catch (error) {
      this.toast(error.message || 'Failed to link Google account.', 'error');
    }
  }

  // Email Login
  async handleEmailLogin() {
    const btn = document.getElementById('btn-login');
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    this.setButtonLoading(btn, true, 'Signing in...');
    try {
      const data = await this.request('/api/v1/auth/login', {
        method: 'POST',
        body: { email, password }
      });

      this.saveTokens(data.accessToken, data.refreshToken);
      this.toast('Signed in successfully!', 'success');
      this.loadDashboard();
    } catch (error) {
      this.toast(error.message, 'error');
    } finally {
      this.setButtonLoading(btn, false);
    }
  }

  // Phone Login
  async handlePhoneLogin() {
    const btn = document.getElementById('btn-login-phone');
    const phoneNumber = document.getElementById('login-phone-number').value.trim();
    const isPasswordMode = document.getElementById('mode-phone-password').checked;

    if (isPasswordMode) {
      const password = document.getElementById('login-phone-pass').value;
      this.setButtonLoading(btn, true, 'Signing in...');
      try {
        const data = await this.request('/api/v1/auth/phone/login', {
          method: 'POST',
          body: { phoneNumber, password }
        });

        this.saveTokens(data.accessToken, data.refreshToken);
        this.toast('Signed in successfully!', 'success');
        this.loadDashboard();
      } catch (error) {
        this.toast(error.message, 'error');
      } finally {
        this.setButtonLoading(btn, false);
      }
    } else {
      // Passwordless SMS OTP
      this.setButtonLoading(btn, true, 'Sending SMS Code...');
      try {
        await this.request('/api/v1/auth/phone/login/request', {
          method: 'POST',
          body: { phoneNumber }
        });

        this.pendingPhone = phoneNumber;
        this.pendingPhonePassword = null;
        this.pendingPhoneMode = 'login';
        
        // 1. Switch view first so DOM elements are mounted & active
        this.switchView('verify-phone');

        // 2. Safely update headers and display
        const titleEl = document.getElementById('phone-otp-title');
        if (titleEl) titleEl.textContent = 'Phone Sign-In';

        const displayEl = document.getElementById('verify-phone-display');
        if (displayEl) {
          displayEl.textContent = phoneNumber;
        }

        const otpInput = document.getElementById('verify-phone-otp');
        if (otpInput) {
          otpInput.value = '';
          setTimeout(() => otpInput.focus(), 100);
        }

        this.startResendPhoneCooldown(60);
        this.toast('Verification code sent to your phone!', 'info');
      } catch (error) {
        this.toast(error.message, 'error');
      } finally {
        this.setButtonLoading(btn, false);
      }
    }
  }

  // Email Registration
  async handleEmailRegister() {
    const btn = document.getElementById('btn-register');
    const firstName = document.getElementById('reg-first-name').value.trim();
    const lastName = document.getElementById('reg-last-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;

    this.setButtonLoading(btn, true, 'Creating account...');
    try {
      await this.request('/api/v1/auth/register', {
        method: 'POST',
        body: { email, password, firstName: firstName || undefined, lastName: lastName || undefined }
      });

      this.pendingEmail = email;
      this.pendingPassword = password;
      
      this.switchView('verify-email');
      const verifyEmailDisplay = document.getElementById('verify-email-display');
      if (verifyEmailDisplay) verifyEmailDisplay.textContent = email;
      
      const otpInput = document.getElementById('verify-otp');
      if (otpInput) {
        otpInput.value = '';
        setTimeout(() => otpInput.focus(), 100);
      }

      this.startResendCooldown(60);
      this.toast('Account created! Please enter the 6-digit verification code.', 'success');
    } catch (error) {
      this.toast(error.message, 'error');
    } finally {
      this.setButtonLoading(btn, false);
    }
  }

  // Phone Registration
  async handlePhoneRegister() {
    const btn = document.getElementById('btn-register-phone');
    const firstName = document.getElementById('reg-phone-first-name').value.trim();
    const lastName = document.getElementById('reg-phone-last-name').value.trim();
    const phoneNumber = document.getElementById('reg-phone-number').value.trim();
    const password = document.getElementById('reg-phone-password').value;

    this.setButtonLoading(btn, true, 'Registering...');
    try {
      await this.request('/api/v1/auth/phone/register', {
        method: 'POST',
        body: {
          phoneNumber,
          password: password.trim() ? password : undefined,
          firstName: firstName || undefined,
          lastName: lastName || undefined
        }
      });

      this.pendingPhone = phoneNumber;
      this.pendingPhonePassword = password.trim() ? password : null;
      this.pendingPhoneMode = 'verify';

      // 1. Switch view first
      this.switchView('verify-phone');

      // 2. Safely update headers and display
      const titleEl = document.getElementById('phone-otp-title');
      if (titleEl) titleEl.textContent = 'Verify Phone Number';

      const displayEl = document.getElementById('verify-phone-display');
      if (displayEl) {
        displayEl.textContent = phoneNumber;
      }

      const otpInput = document.getElementById('verify-phone-otp');
      if (otpInput) {
        otpInput.value = '';
        setTimeout(() => otpInput.focus(), 100);
      }

      this.startResendPhoneCooldown(60);
      this.toast('Account registered! Please enter the SMS verification code.', 'success');
    } catch (error) {
      this.toast(error.message, 'error');
    } finally {
      this.setButtonLoading(btn, false);
    }
  }

  // Email Verification OTP
  async handleVerifyEmailOtp() {
    const btn = document.getElementById('btn-verify-otp');
    const otpInput = document.getElementById('verify-otp');
    const otp = otpInput?.value.trim();

    if (!otp) {
      this.toast('Please enter the 6-digit verification code.', 'warning');
      otpInput?.focus();
      return;
    }

    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      this.toast('Verification code must be 6 digits.', 'warning');
      otpInput?.focus();
      return;
    }

    if (!this.pendingEmail) {
      this.toast('No pending email verification session.', 'warning');
      this.switchView('login');
      return;
    }

    this.setButtonLoading(btn, true, 'Verifying code...');
    try {
      await this.request('/api/v1/auth/verification/verify', {
        method: 'POST',
        body: { email: this.pendingEmail, otp }
      });

      if (this.resendCooldownTimer) {
        clearInterval(this.resendCooldownTimer);
        this.resendCooldownTimer = null;
      }

      // If registered with password, log in automatically and navigate to dashboard
      if (this.pendingPassword) {
        this.setButtonLoading(btn, true, 'Signing in...');
        try {
          const loginData = await this.request('/api/v1/auth/login', {
            method: 'POST',
            body: { email: this.pendingEmail, password: this.pendingPassword }
          });

          this.pendingPassword = null;
          this.saveTokens(loginData.accessToken, loginData.refreshToken);
          this.toast('Email verified and signed in successfully!', 'success');
          await this.loadDashboard();
          return;
        } catch (loginError) {
          this.toast('Email verified! Please sign in.', 'success');
          this.switchView('login');
          const loginEmailInput = document.getElementById('login-email');
          if (loginEmailInput) loginEmailInput.value = this.pendingEmail;
        }
      } else {
        this.toast('Email verified successfully! You can now sign in.', 'success');
        this.switchView('login');
        const loginEmailInput = document.getElementById('login-email');
        if (loginEmailInput) loginEmailInput.value = this.pendingEmail;
      }
    } catch (error) {
      this.toast(error.message || 'Invalid or expired verification code.', 'error');
      otpInput?.select();
    } finally {
      this.setButtonLoading(btn, false);
    }
  }

  // Phone OTP Verification (Registration verification OR Passwordless Login)
  async handleVerifyPhoneOtp() {
    const btn = document.getElementById('btn-verify-phone-otp');
    const otpInput = document.getElementById('verify-phone-otp');
    const otp = otpInput?.value.trim();

    if (!otp) {
      this.toast('Please enter the 6-digit SMS verification code.', 'warning');
      otpInput?.focus();
      return;
    }

    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      this.toast('Verification code must be 6 digits.', 'warning');
      otpInput?.focus();
      return;
    }

    if (!this.pendingPhone) {
      this.toast('No pending phone verification session.', 'warning');
      this.switchView('login');
      return;
    }

    this.setButtonLoading(btn, true, 'Verifying code...');
    try {
      if (this.pendingPhoneMode === 'login') {
        const data = await this.request('/api/v1/auth/phone/login/verify', {
          method: 'POST',
          body: { phoneNumber: this.pendingPhone, otp }
        });

        if (this.resendPhoneCooldownTimer) {
          clearInterval(this.resendPhoneCooldownTimer);
          this.resendPhoneCooldownTimer = null;
        }

        this.saveTokens(data.accessToken, data.refreshToken);
        this.toast('Phone authenticated successfully!', 'success');
        await this.loadDashboard();
      } else {
        await this.request('/api/v1/auth/phone/verification/verify', {
          method: 'POST',
          body: { phoneNumber: this.pendingPhone, otp }
        });

        if (this.resendPhoneCooldownTimer) {
          clearInterval(this.resendPhoneCooldownTimer);
          this.resendPhoneCooldownTimer = null;
        }

        // If registered with password, log in automatically, else navigate to sign in
        if (this.pendingPhonePassword) {
          this.setButtonLoading(btn, true, 'Signing in...');
          try {
            const loginData = await this.request('/api/v1/auth/phone/login', {
              method: 'POST',
              body: { phoneNumber: this.pendingPhone, password: this.pendingPhonePassword }
            });
            this.pendingPhonePassword = null;
            this.saveTokens(loginData.accessToken, loginData.refreshToken);
            this.toast('Phone verified and signed in successfully!', 'success');
            await this.loadDashboard();
            return;
          } catch {
            this.toast('Phone verified! Please sign in.', 'success');
            this.switchView('login');
            const loginPhoneInput = document.getElementById('login-phone-number');
            if (loginPhoneInput) loginPhoneInput.value = this.pendingPhone;
          }
        } else {
          this.toast('Phone verified! You can now sign in.', 'success');
          this.switchView('login');
          const loginPhoneInput = document.getElementById('login-phone-number');
          if (loginPhoneInput) loginPhoneInput.value = this.pendingPhone;
        }
      }
    } catch (error) {
      this.toast(error.message || 'Invalid or expired verification code.', 'error');
      otpInput?.select();
    } finally {
      this.setButtonLoading(btn, false);
    }
  }

  // Resend Email OTP
  async handleResendEmailOtp() {
    if (!this.pendingEmail) {
      this.toast('No email currently pending verification.', 'warning');
      return;
    }
    const btn = document.getElementById('btn-resend-otp');
    if (btn?.disabled) return;

    this.setButtonLoading(btn, true, 'Resending...');
    try {
      await this.request('/api/v1/auth/verification/resend', {
        method: 'POST',
        body: { email: this.pendingEmail }
      });
      this.toast('New verification code sent to your email.', 'info');
      this.startResendCooldown(60);
    } catch (error) {
      this.toast(error.message, 'error');
    } finally {
      this.setButtonLoading(btn, false);
    }
  }

  // Resend Phone OTP
  async handleResendPhoneOtp() {
    if (!this.pendingPhone) {
      this.toast('No phone currently pending verification.', 'warning');
      return;
    }
    const btn = document.getElementById('btn-resend-phone-otp');
    if (btn?.disabled) return;

    this.setButtonLoading(btn, true, 'Resending...');
    try {
      if (this.pendingPhoneMode === 'login') {
        await this.request('/api/v1/auth/phone/login/request', {
          method: 'POST',
          body: { phoneNumber: this.pendingPhone }
        });
      } else {
        await this.request('/api/v1/auth/phone/verification/resend', {
          method: 'POST',
          body: { phoneNumber: this.pendingPhone }
        });
      }
      this.toast('SMS verification code resent.', 'info');
      this.startResendPhoneCooldown(60);
    } catch (error) {
      this.toast(error.message, 'error');
    } finally {
      this.setButtonLoading(btn, false);
    }
  }

  // Email Forgot Password
  async handleEmailForgot() {
    const email = document.getElementById('forgot-email').value.trim();
    try {
      await this.request('/api/v1/auth/password-reset/request', {
        method: 'POST',
        body: { email }
      });

      this.pendingEmail = email;
      this.resetMode = 'email';
      document.getElementById('reset-target-display').textContent = email;
      this.switchView('reset-verify');
      this.toast('If an account exists, a recovery code was sent.', 'info');
    } catch (error) {
      this.toast(error.message, 'error');
    }
  }

  // Phone Forgot Password
  async handlePhoneForgot() {
    const phoneNumber = document.getElementById('forgot-phone-number').value.trim();
    try {
      await this.request('/api/v1/auth/phone/password-reset/request', {
        method: 'POST',
        body: { phoneNumber }
      });

      this.pendingPhone = phoneNumber;
      this.resetMode = 'phone';
      document.getElementById('reset-target-display').textContent = phoneNumber;
      this.switchView('reset-verify');
      this.toast('If an account exists, a recovery code was sent.', 'info');
    } catch (error) {
      this.toast(error.message, 'error');
    }
  }

  // Verify Reset OTP
  async handleVerifyResetOtp() {
    const otp = document.getElementById('reset-otp').value.trim();

    try {
      let data;
      if (this.resetMode === 'phone') {
        data = await this.request('/api/v1/auth/phone/password-reset/verify', {
          method: 'POST',
          body: { phoneNumber: this.pendingPhone, otp }
        });
      } else {
        data = await this.request('/api/v1/auth/password-reset/verify', {
          method: 'POST',
          body: { email: this.pendingEmail, otp }
        });
      }

      this.resetToken = data.resetToken;
      this.switchView('reset-complete');
      this.toast('Code verified! Choose a new password.', 'success');
    } catch (error) {
      this.toast(error.message, 'error');
    }
  }

  // Complete Password Reset
  async handleCompleteReset() {
    const newPassword = document.getElementById('reset-new-password').value;
    if (!this.resetToken) {
      this.switchView('login');
      return;
    }

    try {
      await this.request('/api/v1/auth/password-reset/complete', {
        method: 'POST',
        body: { resetToken: this.resetToken, newPassword }
      });

      this.resetToken = null;
      this.toast('Password reset successfully! Please sign in.', 'success');
      this.switchView('login');
    } catch (error) {
      this.toast(error.message, 'error');
    }
  }

  // --- 6. DEV SANDBOX HELPERS ---
  async fetchDevEmailOtp(type = 'verify') {
    if (!this.pendingEmail) {
      this.toast('No email currently pending.', 'warning');
      return;
    }
    try {
      const data = await this.request(`/api/v1/auth/dev/otp?email=${encodeURIComponent(this.pendingEmail)}&type=${type}`);
      if (data?.otp) {
        const input = document.getElementById('verify-otp');
        if (input) input.value = data.otp;
        this.toast(`Auto-filled Dev OTP: ${data.otp}`, 'success');
      }
    } catch (err) {
      this.toast('No captured dev OTP found. Check console or wait a moment.', 'warning');
    }
  }

  async fetchDevSmsOtp() {
    if (!this.pendingPhone) {
      this.toast('No phone currently pending.', 'warning');
      return;
    }
    try {
      const type = this.pendingPhoneMode === 'login' ? 'login' : 'verify';
      const data = await this.request(`/api/v1/auth/dev/sms-otp?phoneNumber=${encodeURIComponent(this.pendingPhone)}&type=${type}`);
      if (data?.otp) {
        const input = document.getElementById('verify-phone-otp');
        if (input) input.value = data.otp;
        this.toast(`Auto-filled Dev SMS OTP: ${data.otp}`, 'success');
      }
    } catch (err) {
      this.toast('No captured dev SMS OTP found. Check server console.', 'warning');
    }
  }

  async fetchDevResetOtp() {
    try {
      let data;
      if (this.resetMode === 'phone' && this.pendingPhone) {
        data = await this.request(`/api/v1/auth/dev/sms-otp?phoneNumber=${encodeURIComponent(this.pendingPhone)}&type=reset`);
      } else if (this.pendingEmail) {
        data = await this.request(`/api/v1/auth/dev/otp?email=${encodeURIComponent(this.pendingEmail)}&type=reset`);
      }

      if (data?.otp) {
        const input = document.getElementById('reset-otp');
        if (input) input.value = data.otp;
        this.toast(`Auto-filled Dev Recovery Code: ${data.otp}`, 'success');
      }
    } catch (err) {
      this.toast('No captured dev code found. Check server console.', 'warning');
    }
  }

  // --- 7. DASHBOARD & SESSION MANAGEMENT ---
  async loadDashboard() {
    this.setAuthState('loading');
    try {
      const meData = await this.authenticatedRequest('/api/v1/auth/me');
      this.currentUser = meData.user;
      this.setAuthState('authenticated');
      this.renderDashboard();
      this.switchView('dashboard');
    } catch {
      this.handleAuthFailure();
    }
  }

  async renderDashboard() {
    if (!this.currentUser) return;

    const greeting = document.getElementById('dash-greeting');
    const emailBadge = document.getElementById('dash-email');
    const phoneBadge = document.getElementById('dash-phone');

    if (greeting) {
      const name = this.currentUser.firstName
        ? `${this.currentUser.firstName} ${this.currentUser.lastName || ''}`.trim()
        : 'User';
      greeting.textContent = `Welcome, ${name}`;
    }

    if (emailBadge) {
      emailBadge.textContent = this.currentUser.email ? `✉️ ${this.currentUser.email}` : '✉️ No Email';
    }

    if (phoneBadge) {
      phoneBadge.textContent = this.currentUser.phoneNumber ? `📱 ${this.currentUser.phoneNumber}` : '📱 No Phone';
    }

    // Load Security Status
    try {
      const sec = await this.authenticatedRequest('/api/v1/auth/security');
      const emailVerBadge = document.getElementById('sec-email-verified');
      const phoneVerBadge = document.getElementById('sec-phone-verified');
      const sessionsCount = document.getElementById('sec-active-sessions');
      const lockoutBadge = document.getElementById('sec-locked-status');

      if (emailVerBadge) {
        emailVerBadge.textContent = sec.emailVerified ? 'Verified' : 'Unverified';
        emailVerBadge.className = `badge ${sec.emailVerified ? 'badge-success' : 'badge-warning'}`;
      }

      if (phoneVerBadge) {
        phoneVerBadge.textContent = sec.phoneVerified ? 'Verified' : (sec.phoneNumber ? 'Unverified' : 'Not linked');
        phoneVerBadge.className = `badge ${sec.phoneVerified ? 'badge-success' : 'badge-warning'}`;
      }

      if (sessionsCount) sessionsCount.textContent = String(sec.activeSessions);
      if (lockoutBadge) {
        lockoutBadge.textContent = sec.accountLocked ? 'Locked' : 'Normal';
        lockoutBadge.className = `badge ${sec.accountLocked ? 'badge-danger' : 'badge-success'}`;
      }

      // Google Identity Status in Dashboard
      const googleLinkedBadge = document.getElementById('sec-google-linked');
      const googleLinkSection = document.getElementById('google-link-section');
      const isGoogleLinked = Boolean(this.currentUser?.identities?.some((i) => i.provider === 'GOOGLE'));

      if (googleLinkedBadge) {
        googleLinkedBadge.textContent = isGoogleLinked ? 'Linked' : 'Not Linked';
        googleLinkedBadge.className = `badge ${isGoogleLinked ? 'badge-success' : 'badge-warning'}`;
      }

      if (googleLinkSection) {
        if (!isGoogleLinked && this.googleAuthEnabled && this.googleClientId) {
          googleLinkSection.classList.remove('hidden');
        } else {
          googleLinkSection.classList.add('hidden');
        }
      }
    } catch {}

    // Load Sessions List
    this.loadSessionsList();
  }

  async loadSessionsList() {
    const listEl = document.getElementById('sessions-list');
    if (!listEl) return;

    try {
      const data = await this.authenticatedRequest('/api/v1/auth/sessions');
      listEl.innerHTML = '';

      if (!data.sessions || data.sessions.length === 0) {
        listEl.innerHTML = '<div class="empty-state">No active sessions found.</div>';
        return;
      }

      data.sessions.forEach((s) => {
        const item = document.createElement('div');
        item.className = `session-item ${s.isCurrent ? 'current-session' : ''}`;
        item.innerHTML = `
          <div class="session-info">
            <div class="session-device">
              ${s.userAgent ? s.userAgent.substring(0, 48) : 'Unknown Device'}
              ${s.isCurrent ? '<span class="current-badge">Current Device</span>' : ''}
            </div>
            <div class="session-meta">
              IP: ${s.ipAddress || '127.0.0.1'} • Last active: ${new Date(s.lastUsedAt).toLocaleTimeString()}
            </div>
          </div>
          ${
            !s.isCurrent
              ? `<button class="btn btn-secondary btn-xs btn-revoke-session" data-id="${s.id}">Revoke</button>`
              : ''
          }
        `;
        listEl.appendChild(item);
      });

      listEl.querySelectorAll('.btn-revoke-session').forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const sid = e.target.getAttribute('data-id');
          await this.revokeSession(sid);
        });
      });
    } catch {}
  }

  async revokeSession(sessionId) {
    try {
      await this.authenticatedRequest(`/api/v1/auth/sessions/${sessionId}`, { method: 'DELETE' });
      this.toast('Session revoked.', 'info');
      this.loadSessionsList();
    } catch (error) {
      this.toast(error.message, 'error');
    }
  }

  async handleLogout() {
    try {
      await this.authenticatedRequest('/api/v1/auth/logout', { method: 'POST' });
    } catch {}
    this.handleAuthFailure();
    this.toast('Logged out.', 'info');
  }

  async handleLogoutAll() {
    try {
      await this.authenticatedRequest('/api/v1/auth/logout-all', { method: 'POST' });
    } catch {}
    this.handleAuthFailure();
    this.toast('All devices logged out.', 'info');
  }

  async handleChangePassword() {
    const currentPassword = document.getElementById('change-current-pass').value;
    const newPassword = document.getElementById('change-new-pass').value;

    try {
      await this.authenticatedRequest('/api/v1/auth/change-password', {
        method: 'POST',
        body: { currentPassword, newPassword }
      });

      this.toast('Password updated. Please sign in with your new password.', 'success');
      this.handleAuthFailure();
    } catch (error) {
      this.toast(error.message, 'error');
    }
  }

  async handleRequestPhoneChange() {
    const newPhoneNumber = document.getElementById('new-phone-input').value.trim();
    try {
      await this.authenticatedRequest('/api/v1/auth/phone/change/request', {
        method: 'POST',
        body: { newPhoneNumber }
      });

      this.toast('Verification SMS sent to new phone number!', 'info');
      document.getElementById('form-verify-phone-change')?.classList.remove('hidden');
    } catch (error) {
      this.toast(error.message, 'error');
    }
  }

  async handleVerifyPhoneChange() {
    const newPhoneNumber = document.getElementById('new-phone-input').value.trim();
    const otp = document.getElementById('change-phone-otp').value.trim();

    try {
      await this.authenticatedRequest('/api/v1/auth/phone/change/verify', {
        method: 'POST',
        body: { newPhoneNumber, otp }
      });

      this.toast('Phone number updated and verified!', 'success');
      document.getElementById('form-verify-phone-change')?.classList.add('hidden');
      this.loadDashboard();
    } catch (error) {
      this.toast(error.message, 'error');
    }
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new LoginLabApp();
  window.app.init();
});
