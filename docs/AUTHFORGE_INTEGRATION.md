# LoginLab — AuthForge Integration Guide

This document details the architectural integration between **LoginLab** and **AuthForge**, establishing LoginLab as a pure client of the AuthForge centralized authentication service.

---

## 1. Architecture Overview

```text
┌──────────────────────────────────────────────┐
│           LoginLab Client Application        │
│          (Web SPA / Dashboard Frontend)      │
│                                              │
│  • @authforge/client SDK                     │
│  • Single-Flight Refresh Mutex               │
│  • Reactive Authentication State             │
│  • Session & Security Management             │
└──────────────────────┬───────────────────────┘
                       │
                       │ HTTPS / JSON REST (/api/v1/auth/*)
                       ▼
┌──────────────────────────────────────────────┐
│                AuthForge API                 │
│                                              │
│  • Express • TypeScript • Helmet             │
│  • Rate Limiting • Audit Event Logging       │
│  • Short-Lived JWT Access Tokens             │
│  • Single-Use Refresh Token Rotation         │
│  • Brute-Force Lockout Protection            │
└──────────────────────┬───────────────────────┘
                       │
                       │ Prisma ORM
                       ▼
┌──────────────────────────────────────────────┐
│              PostgreSQL Database             │
│                 "authforge"                  │
└──────────────────────────────────────────────┘
```

### Non-Negotiable Rule: Zero Direct Database Access
LoginLab never connects directly to PostgreSQL and possesses **no database connection strings, database credentials, or ORM dependencies**. All authentication, registration, password recovery, session handling, and profile queries are executed exclusively over HTTP/REST endpoints provided by AuthForge.

---

## 2. Environment Configuration

LoginLab requires only the public URL of the AuthForge API:

```env
# LoginLab Configuration (.env)
PORT=3000
AUTHFORGE_BASE_URL=http://localhost:4000
```

In production:
```env
AUTHFORGE_BASE_URL=https://auth.yourdomain.com
```

> [!CAUTION]
> NEVER include `DATABASE_URL`, `JWT_ACCESS_SECRET`, `OTP_SECRET`, or Prisma configuration inside LoginLab.

---

## 3. Client Authentication Lifecycle

### 3.1 Registration & Email Verification
1. User enters registration details in LoginLab.
2. LoginLab calls `POST /api/v1/auth/register`.
3. AuthForge creates the user record, hashes the password with Argon2id, generates a 6-digit OTP, and returns `201 Created`.
4. LoginLab transitions to the verification screen.
5. User enters the 6-digit OTP -> LoginLab calls `POST /api/v1/auth/verification/verify`.
6. Email is marked verified and user proceeds to login.

### 3.2 Login & Token Storage
1. User enters credentials in LoginLab.
2. LoginLab calls `POST /api/v1/auth/login`.
3. AuthForge validates credentials against stored Argon2id hash, creates a new session in PostgreSQL, issues a short-lived access token (`HS256`, 15m) and a 256-bit cryptographically random refresh token.
4. LoginLab stores the token pair atomically in local storage.
5. Reactive auth state transitions to `authenticated` and renders the dashboard.

### 3.3 Single-Flight Token Refresh Rotation
1. When an access token expires, LoginLab encounters an expired token or a 401 response.
2. The single-flight mutex in `@authforge/client` intercepts the call and dispatches **exactly one** `POST /api/v1/auth/refresh` request.
3. Multiple concurrent background requests wait on the same refresh promise.
4. AuthForge atomically rotates the refresh token, revokes the previous token, and returns a new token pair.
5. All pending requests retry seamlessly with the new access token without causing token reuse or race conditions.

### 3.4 Password Reset Flow
1. User submits email -> LoginLab calls `POST /api/v1/auth/password-reset/request`.
2. AuthForge generates a 6-digit recovery OTP (protected against account enumeration).
3. User enters reset OTP -> LoginLab calls `POST /api/v1/auth/password-reset/verify` and receives a single-use `resetToken`.
4. User submits new password -> LoginLab calls `POST /api/v1/auth/password-reset/complete`.
5. AuthForge updates password hash and revokes all active sessions across all devices.
6. User logs in with new password.

### 3.5 Session Management & Device Revocation
1. LoginLab queries `GET /api/v1/auth/sessions` to list active sessions.
2. Each session displays IP address, user-agent metadata, last active timestamp, and current device indicator.
3. User can revoke specific other devices (`DELETE /api/v1/auth/sessions/:sessionId`) or all devices (`POST /api/v1/auth/logout-all`).
4. Server strictly enforces session ownership, preventing cross-user revocation.

---

## 4. Running LoginLab Locally

1. **Ensure AuthForge backend is running on PORT 4000:**
   ```bash
   cd AuthForge
   npm start
   ```

2. **Start LoginLab on PORT 3000:**
   ```bash
   cd AuthForge/client/loginlab
   npm start
   ```

3. **Open browser:**
   ```text
   http://localhost:3000
   ```

4. **Run Integration Tests:**
   ```bash
   npm test
   ```
