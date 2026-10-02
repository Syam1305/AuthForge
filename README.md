# AuthForge

AuthForge is a standalone, enterprise-grade reusable authentication backend service designed to provide centralized authentication, session lifecycle handling, short-lived JWT access tokens, secure refresh token rotation with replay detection, OTP validation, password recovery, brute-force lockout protection, security audit event logging, production-ready operational probes, a complete client integration SDK (`@authforge/client`), and reference client application (`LoginLab`).

---

## Current Phase

```text
Phase 10 — Google Authentication / "Continue with Google" (COMPLETED)
```

Phase 10 adds **Google Authentication** via Google Identity Services (GIS):
* **Authoritative Session Management**: Google serves purely as an external identity provider (`AuthProvider.GOOGLE`). AuthForge validates ID tokens, issues authoritative short-lived access JWTs and rotating refresh tokens, and manages server-side sessions.
* **Account Takeover Protection**: If a Google login uses an email matching an unlinked existing AuthForge account, automatic account merging is strictly rejected (`409 GOOGLE_LINK_REQUIRED`), requiring explicit authenticated linking.
* **Race Condition Resilience**: Handles concurrent first-time logins gracefully using unique database constraints `(provider, providerSubject)` and atomic transactions.
* **Cross-User Linking Protection**: Strict validation prevents attaching already-linked Google identities to different user accounts.
* **Client SDK & LoginLab Integration**: Native SDK support (`loginWithGoogle`, `linkGoogle`) and responsive GIS button integration in LoginLab.

---

## Architecture

```text
                    ┌──────────────────────────┐
                    │   Client Applications    │
                    │                          │
                    │  LoginLab  │ DairyKhata  │
                    │   @authforge/client SDK  │
                    └────────────┬─────────────┘
                                 │
                     HTTPS / JSON REST (/api/v1/*)
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │   Reverse Proxy (Nginx)  │
                    │   SSL / TLS Termination  │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │      AuthForge API       │
                    │                          │
                    │ Express • TS • Helmet    │
                    │ RateLimiter • Audit Logs │
                    │ Token & Session Engine   │
                    │ Password & Lockout Guard │
                    │ Health & Readiness Probes│
                    └────────────┬─────────────┘
                                 │
            ┌────────────────────┴────────────────────┐
            ▼                                         ▼
     Access Token                               Refresh Token
       JWT (HS256)                            Crypto Random Bytes
  [sub, sid, jti, exp]                                │
            │                                   SHA-256 Hash
            │                                         │
            │                                         ▼
            │                                    PostgreSQL
            │                               (users, sessions,
            │                                refresh_tokens,
            │                                security_events)
            │                                         │
            └────────────────────┬────────────────────┘
                                 ▼
                              Session
                        [IP, UA, lastUsed]
```

---

## Prerequisites

* **Node.js**: v18+ (tested with Node.js v24)
* **npm**: v9+ (tested with npm v11)
* **PostgreSQL**: PostgreSQL 14+ (tested on PostgreSQL 18)

---

## Environment Configuration

Create a `.env` file based on `.env.example`:

```env
# PostgreSQL Connection String
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/authforge?schema=public"

# Server Configuration
PORT=4000
NODE_ENV=development
TRUST_PROXY=1

# Security / CORS (comma-separated origins or *)
CORS_ORIGIN=http://localhost:3000

# OTP Secret
OTP_SECRET=authforge-default-otp-hmac-secret-phase3

# JWT & Token Configuration
JWT_ACCESS_SECRET=your_secure_minimum_32_character_jwt_secret_key_here!
ACCESS_TOKEN_ISSUER=authforge
ACCESS_TOKEN_AUDIENCE=authforge-api
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL_DAYS=7

# Account Security & Lockout Policy
LOGIN_MAX_FAILED_ATTEMPTS=5
LOGIN_LOCKOUT_MINUTES=15
SECURITY_EVENT_RETENTION_DAYS=90
```

---

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run Prisma migrations:**
   ```bash
   npm run prisma:migrate
   ```

3. **Generate Prisma client:**
   ```bash
   npm run prisma:generate
   ```

4. **Build TypeScript backend:**
   ```bash
   npm run build
   ```

5. **Start AuthForge Server:**
   ```bash
   npm start
   ```

6. **Start LoginLab Client Application:**
   ```bash
   cd client/loginlab
   npm start
   ```
   *(Opens at `http://localhost:3000`)*

---

## Documentation Links

* [LoginLab Integration Guide (`docs/AUTHFORGE_INTEGRATION.md`)](file:///c:/Users/nsyam/OneDrive/Desktop/AuthForge/docs/AUTHFORGE_INTEGRATION.md)
* [API Contract Specification (`docs/API_CONTRACT.md`)](file:///c:/Users/nsyam/OneDrive/Desktop/AuthForge/docs/API_CONTRACT.md)
* [Client Integration Guide (`docs/CLIENT_INTEGRATION.md`)](file:///c:/Users/nsyam/OneDrive/Desktop/AuthForge/docs/CLIENT_INTEGRATION.md)
* [Production Deployment Guide (`DEPLOYMENT.md`)](file:///c:/Users/nsyam/OneDrive/Desktop/AuthForge/DEPLOYMENT.md)
* [Official Client SDK (`client/authforge-client`)](file:///c:/Users/nsyam/OneDrive/Desktop/AuthForge/client/authforge-client)
* [LoginLab Consumer App (`client/loginlab`)](file:///c:/Users/nsyam/OneDrive/Desktop/AuthForge/client/loginlab)

---

## Project Roadmap

* **Phase 1 — Backend Foundation** ✅
* **Phase 2 — User Authentication & Password Management** ✅
* **Phase 3 — OTP Engine & Password Recovery** ✅
* **Phase 4 — Token & Session Management** ✅
* **Phase 5 — Account Security, Session Security & Authentication Hardening** ✅
* **Phase 6 — Production Readiness & Operational Hardening** ✅
* **Phase 7 — Client Application Integration & SDK Foundation** ✅
* **Phase 8 — LoginLab Integration** ✅
