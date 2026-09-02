// LoginLab — Frontend Single-Page Application Client

class LoginLabApp {
  constructor() {
    this.baseUrl = 'http://localhost:4000';
    this.accessToken = null;
    this.refreshToken = null;
    this.currentUser = null;
    this.pendingEmail = null;
    this.resetToken = null;
    this.resendCooldownTimer = null;
    this.refreshPromise = null;
  }

  async init() {
    try {
      const configRes = await fetch('/api/config');
      if (configRes.ok) {
        const configData = await configRes.json();
        if (configData.authforgeBaseUrl) {
          this.baseUrl = configData.authforgeBaseUrl.replace(/\/+$/, '');
        }
      }
    } catch {
      // Use fallback
    }

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
        // Access token expired -> perform single-flight refresh
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

  // --- 3. VIEW ROUTING ---
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
    }, 4000);
  }

  // --- 4. EVENT BINDING ---
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

    document.getElementById('link-forgot-password')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('forgot');
    });

    document.getElementById('link-forgot-to-login')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('login');
    });

    document.getElementById('link-back-to-login')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('login');
    });

    // Form Submissions
    document.getElementById('form-login')?.addEventListener('submit', (e) => this.handleLogin(e));
    document.getElementById('form-register')?.addEventListener('submit', (e) => this.handleRegister(e));
    document.getElementById('form-verify-email')?.addEventListener('submit', (e) => this.handleVerifyEmail(e));
    document.getElementById('btn-resend-otp')?.addEventListener('click', () => this.handleResendOtp());
    document.getElementById('form-forgot')?.addEventListener('submit', (e) => this.handleForgotPassword(e));
    document.getElementById('form-reset-verify')?.addEventListener('submit', (e) => this.handleResetVerify(e));
    document.getElementById('form-reset-complete')?.addEventListener('submit', (e) => this.handleResetComplete(e));
    document.getElementById('form-change-password')?.addEventListener('submit', (e) => this.handleChangePassword(e));
    document.getElementById('btn-logout')?.addEventListener('click', () => this.handleLogout());
    document.getElementById('btn-logout-all')?.addEventListener('click', () => this.handleLogoutAll());
  }

  // --- 5. AUTH FLOW HANDLERS ---
  async handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    try {
      const data = await this.request('/api/v1/auth/login', {
        method: 'POST',
        body: { email, password }
      });

      this.saveTokens(data.accessToken, data.refreshToken);
      this.currentUser = data.user;
      this.toast('Sign in successful!', 'success');
      this.loadDashboard();
    } catch (err) {
      if (err.code === 'ACCOUNT_LOCKED') {
        this.toast('Account is temporarily locked due to excessive failed attempts.', 'error');
      } else if (err.code === 'INVALID_CREDENTIALS') {
        this.toast('Invalid email or password.', 'error');
      } else {
        this.toast(err.message, 'error');
      }
    }
  }

  async handleRegister(e) {
    e.preventDefault();
    const firstName = document.getElementById('reg-first-name').value.trim();
    const lastName = document.getElementById('reg-last-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;

    try {
      await this.request('/api/v1/auth/register', {
        method: 'POST',
        body: { firstName, lastName, email, password }
      });

      this.pendingEmail = email;
      document.getElementById('verify-email-display').textContent = email;
      this.toast('Account registered! Verification code sent to email.', 'success');
      this.switchView('verify-email');
      this.startResendCooldown();
    } catch (err) {
      this.toast(err.message, 'error');
    }
  }

  async handleVerifyEmail(e) {
    e.preventDefault();
    const otp = document.getElementById('verify-otp').value.trim();

    try {
      await this.request('/api/v1/auth/verification/verify', {
        method: 'POST',
        body: { email: this.pendingEmail, otp }
      });

      this.toast('Email verified successfully! You may now sign in.', 'success');
      this.switchView('login');
      document.getElementById('login-email').value = this.pendingEmail;
    } catch (err) {
      this.toast(err.message, 'error');
    }
  }

  async handleResendOtp() {
    if (!this.pendingEmail) return;
    try {
      await this.request('/api/v1/auth/verification/resend', {
        method: 'POST',
        body: { email: this.pendingEmail }
      });
      this.toast('New verification code sent.', 'info');
      this.startResendCooldown();
    } catch (err) {
      this.toast(err.message, 'error');
    }
  }

  startResendCooldown() {
    let secondsLeft = 60;
    const btn = document.getElementById('btn-resend-otp');
    const timer = document.getElementById('resend-timer');
    if (!btn || !timer) return;

    btn.disabled = true;
    timer.textContent = `(Resend in ${secondsLeft}s)`;

    if (this.resendCooldownTimer) clearInterval(this.resendCooldownTimer);
    this.resendCooldownTimer = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        clearInterval(this.resendCooldownTimer);
        btn.disabled = false;
        timer.textContent = '';
      } else {
        timer.textContent = `(Resend in ${secondsLeft}s)`;
      }
    }, 1000);
  }

  async handleForgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value.trim();

    try {
      await this.request('/api/v1/auth/password-reset/request', {
        method: 'POST',
        body: { email }
      });

      this.pendingEmail = email;
      document.getElementById('reset-email-display').textContent = email;
      this.toast('Password recovery code sent.', 'info');
      this.switchView('reset-verify');
    } catch (err) {
      this.toast(err.message, 'error');
    }
  }

  async handleResetVerify(e) {
    e.preventDefault();
    const otp = document.getElementById('reset-otp').value.trim();

    try {
      const data = await this.request('/api/v1/auth/password-reset/verify', {
        method: 'POST',
        body: { email: this.pendingEmail, otp }
      });

      this.resetToken = data.resetToken;
      this.toast('Code verified. Enter your new password.', 'success');
      this.switchView('reset-complete');
    } catch (err) {
      this.toast(err.message, 'error');
    }
  }

  async handleResetComplete(e) {
    e.preventDefault();
    const newPassword = document.getElementById('reset-new-password').value;

    try {
      await this.request('/api/v1/auth/password-reset/complete', {
        method: 'POST',
        body: { resetToken: this.resetToken, newPassword }
      });

      this.toast('Password reset successfully. Please sign in.', 'success');
      this.switchView('login');
    } catch (err) {
      this.toast(err.message, 'error');
    }
  }

  // --- 6. DASHBOARD & SESSION MANAGEMENT ---
  async loadDashboard() {
    this.setAuthState('loading');
    try {
      const userData = await this.authenticatedRequest('/api/v1/auth/me');
      this.currentUser = userData.user;

      document.getElementById('dash-greeting').textContent = `Welcome, ${this.currentUser.firstName || 'User'}`;
      document.getElementById('dash-email').textContent = this.currentUser.email;

      this.setAuthState('authenticated');
      this.switchView('dashboard');

      this.loadSecurityStatus();
      this.loadSessions();
    } catch (err) {
      this.toast('Session expired. Please sign in.', 'info');
      this.handleAuthFailure();
    }
  }

  async loadSecurityStatus() {
    try {
      const status = await this.authenticatedRequest('/api/v1/auth/security');
      document.getElementById('sec-email-verified').textContent = status.emailVerified ? 'Verified' : 'Unverified';
      document.getElementById('sec-active-sessions').textContent = status.activeSessions;
      
      const lockBadge = document.getElementById('sec-locked-status');
      if (status.accountLocked) {
        lockBadge.textContent = 'Locked';
        lockBadge.className = 'badge badge-danger';
      } else {
        lockBadge.textContent = 'Normal (Unlocked)';
        lockBadge.className = 'badge badge-success';
      }

      document.getElementById('sec-password-updated').textContent = new Date(status.passwordUpdatedAt).toLocaleDateString();
    } catch {}
  }

  async loadSessions() {
    const list = document.getElementById('sessions-list');
    if (!list) return;

    try {
      const data = await this.authenticatedRequest('/api/v1/auth/sessions');
      list.innerHTML = '';

      if (!data.sessions || data.sessions.length === 0) {
        list.innerHTML = '<p class="session-meta">No active sessions.</p>';
        return;
      }

      data.sessions.forEach((s) => {
        const row = document.createElement('div');
        row.className = 'session-row';
        row.innerHTML = `
          <div class="session-info">
            <strong>${s.isCurrent ? 'Current Device 🟢' : 'Other Device'}</strong>
            <span class="session-meta">IP: ${s.ipAddress || 'Unknown'} | Last active: ${new Date(s.lastUsedAt).toLocaleTimeString()}</span>
          </div>
          ${!s.isCurrent ? `<button class="btn btn-danger btn-sm" onclick="window.app.revokeSession('${s.id}')">Revoke</button>` : ''}
        `;
        list.appendChild(row);
      });
    } catch {}
  }

  async revokeSession(sessionId) {
    try {
      await this.authenticatedRequest(`/api/v1/auth/sessions/${sessionId}`, {
        method: 'DELETE'
      });
      this.toast('Session revoked.', 'info');
      this.loadSessions();
      this.loadSecurityStatus();
    } catch (err) {
      this.toast(err.message, 'error');
    }
  }

  async handleChangePassword(e) {
    e.preventDefault();
    const currentPassword = document.getElementById('change-current-pass').value;
    const newPassword = document.getElementById('change-new-pass').value;

    try {
      await this.authenticatedRequest('/api/v1/auth/change-password', {
        method: 'POST',
        body: { currentPassword, newPassword }
      });

      this.toast('Password changed successfully. All sessions revoked. Please sign in again.', 'success');
      this.handleAuthFailure();
    } catch (err) {
      this.toast(err.message, 'error');
    }
  }

  async handleLogout() {
    try {
      await this.authenticatedRequest('/api/v1/auth/logout', { method: 'POST' });
    } catch {}
    this.toast('Signed out successfully.', 'info');
    this.handleAuthFailure();
  }

  async handleLogoutAll() {
    try {
      await this.authenticatedRequest('/api/v1/auth/logout-all', { method: 'POST' });
    } catch {}
    this.toast('All devices signed out successfully.', 'info');
    this.handleAuthFailure();
  }
}

window.app = new LoginLabApp();
document.addEventListener('DOMContentLoaded', () => {
  window.app.init();
});
