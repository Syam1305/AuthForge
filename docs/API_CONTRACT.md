# AuthForge API Contract (v1)

This document defines the strict, authoritative REST API specification for **AuthForge**. All client applications (e.g. LoginLab, DairyKhata, mobile applications, web frontends) must interact exclusively through these HTTP endpoints.

---

## Global Standards & Conventions

### Base URL
* **Development:** `http://localhost:4000`
* **Production:** `https://auth.yourdomain.com` (configured via client environment variable `AUTHFORGE_BASE_URL`)

### Headers
* **Content-Type:** `application/json` (Required on all requests with JSON payload)
* **Authorization:** `Bearer <ACCESS_TOKEN>` (Required on all authenticated endpoints)
* **X-Request-ID:** Optional client-generated correlation ID (sanitized alphanumeric/UUID format, max 64 characters)

### Response Envelopes
Every response from AuthForge is formatted consistently in JSON:

#### Success Response Envelope
```json
{
  "success": true,
  "data": { ... }
}
```

#### Error Response Envelope
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable description",
    "details": [ ... ]
  }
}
```

---

## 1. Health & Operational Endpoints

### 1.1 Process Liveness Probe
* **Method:** `GET`
* **Path:** `/health` or `/api/v1/health`
* **Authentication:** None
* **Status:** `200 OK`
* **Response Body:**
```json
{
  "success": true,
  "service": "AuthForge",
  "status": "healthy"
}
```

### 1.2 Service Readiness Probe
* **Method:** `GET`
* **Path:** `/ready` or `/api/v1/ready`
* **Authentication:** None
* **Success Status:** `200 OK`
```json
{
  "success": true,
  "service": "AuthForge",
  "status": "ready"
}
```
* **Failure Status:** `503 Service Unavailable`
```json
{
  "success": false,
  "error": {
    "code": "NOT_READY",
    "message": "Service is not ready to accept traffic."
  }
}
```

### 1.3 Database Health Probe
* **Method:** `GET`
* **Path:** `/health/db` or `/api/v1/health/db`
* **Authentication:** None
* **Success Status:** `200 OK`
```json
{
  "success": true,
  "service": "AuthForge",
  "database": "connected"
}
```

---

## 2. Authentication & Session Endpoints

### 2.1 User Registration
* **Method:** `POST`
* **Path:** `/api/v1/auth/register`
* **Authentication:** None
* **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!",
  "firstName": "John",
  "lastName": "Doe"
}
```
* **Validation Rules:**
  - `email`: valid email format, max 255 chars (normalized to lowercase)
  - `password`: min 8 chars, max 128 chars, requires uppercase, lowercase, digit, and special character
  - `firstName`, `lastName`: optional strings, max 100 chars
* **Success Status:** `201 Created`
* **Response Body:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-v4",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isActive": true,
      "emailVerifiedAt": null,
      "createdAt": "2026-09-01T12:00:00.000Z",
      "updatedAt": "2026-09-01T12:00:00.000Z"
    }
  }
}
```
* **Errors:**
  - `400 VALIDATION_ERROR` — Invalid payload or weak password
  - `409 EMAIL_ALREADY_EXISTS` — Email is already registered

---

### 2.2 User Login
* **Method:** `POST`
* **Path:** `/api/v1/auth/login`
* **Rate Limit:** 100 requests / minute / IP
* **Authentication:** None
* **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!"
}
```
* **Success Status:** `200 OK`
* **Response Body:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-v4",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isActive": true,
      "emailVerifiedAt": "2026-09-01T12:05:00.000Z",
      "createdAt": "2026-09-01T12:00:00.000Z",
      "updatedAt": "2026-09-01T12:05:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "random_hex_string_64_chars",
    "tokenType": "Bearer",
    "expiresIn": 900
  }
}
```
* **Errors:**
  - `400 VALIDATION_ERROR` — Missing or malformed email/password
  - `401 INVALID_CREDENTIALS` — Incorrect email or password (timing-equalized)
  - `403 ACCOUNT_LOCKED` — Account temporarily locked due to excessive failed attempts
  - `403 ACCOUNT_DISABLED` — Account deactivated
  - `429 RATE_LIMITED` — IP rate limit exceeded

---

### 2.3 Refresh Token Rotation
* **Method:** `POST`
* **Path:** `/api/v1/auth/refresh`
* **Rate Limit:** 100 requests / minute / IP
* **Authentication:** None (Uses refresh token in payload)
* **Request Body:**
```json
{
  "refreshToken": "current_valid_refresh_token"
}
```
* **Success Status:** `200 OK`
* **Response Body:**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_access_token_jwt",
    "refreshToken": "new_rotated_refresh_token",
    "tokenType": "Bearer",
    "expiresIn": 900
  }
}
```
* **Token Rotation Invariant:** The client **must replace both tokens** atomically. The old refresh token is consumed immediately upon issuance.
* **Errors:**
  - `400 VALIDATION_ERROR` — Missing refreshToken string
  - `401 INVALID_REFRESH_TOKEN` — Unknown or malformed refresh token
  - `401 REFRESH_TOKEN_REUSED` — Replay detected! Session & token family revoked immediately
  - `401 SESSION_REVOKED` — Associated session is already revoked
  - `401 SESSION_EXPIRED` — Session lifespan exceeded

---

### 2.4 User Profile (`/me`)
* **Method:** `GET`
* **Path:** `/api/v1/auth/me`
* **Authentication:** `Bearer <ACCESS_TOKEN>`
* **Success Status:** `200 OK`
* **Response Body:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-v4",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isActive": true,
      "emailVerifiedAt": "2026-09-01T12:05:00.000Z",
      "createdAt": "2026-09-01T12:00:00.000Z",
      "updatedAt": "2026-09-01T12:05:00.000Z"
    }
  }
}
```
* **Errors:**
  - `401 AUTH_REQUIRED` / `TOKEN_EXPIRED` / `TOKEN_INVALID` / `SESSION_REVOKED`
  - `404 NOT_FOUND` — User not found

---

### 2.5 Logout Active Session
* **Method:** `POST`
* **Path:** `/api/v1/auth/logout`
* **Authentication:** `Bearer <ACCESS_TOKEN>`
* **Success Status:** `200 OK`
* **Response Body:**
```json
{
  "success": true,
  "data": {
    "message": "Session revoked successfully."
  }
}
```

---

### 2.6 Logout All Devices (`logout-all`)
* **Method:** `POST`
* **Path:** `/api/v1/auth/logout-all`
* **Authentication:** `Bearer <ACCESS_TOKEN>`
* **Success Status:** `200 OK`
* **Response Body:**
```json
{
  "success": true,
  "data": {
    "message": "All active sessions have been revoked."
  }
}
```

---

### 2.7 List User Sessions
* **Method:** `GET`
* **Path:** `/api/v1/auth/sessions`
* **Authentication:** `Bearer <ACCESS_TOKEN>`
* **Success Status:** `200 OK`
* **Response Body:**
```json
{
  "success": true,
  "data": {
    "sessions": [
      {
        "id": "session-uuid-1",
        "ipAddress": "192.168.1.50",
        "userAgent": "Mozilla/5.0 ...",
        "lastUsedAt": "2026-09-01T12:10:00.000Z",
        "createdAt": "2026-09-01T12:00:00.000Z",
        "isCurrent": true,
        "isRevoked": false
      }
    ]
  }
}
```

---

### 2.8 Revoke Specific Session
* **Method:** `DELETE`
* **Path:** `/api/v1/auth/sessions/:sessionId`
* **Authentication:** `Bearer <ACCESS_TOKEN>`
* **Success Status:** `200 OK`
* **Response Body:**
```json
{
  "success": true,
  "data": {
    "message": "Session revoked successfully."
  }
}
```
* **Errors:**
  - `403 SESSION_FORBIDDEN` — Attempting to revoke a session belonging to another user
  - `404 SESSION_NOT_FOUND` — Session ID does not exist

---

## 3. Email Verification Endpoints

### 3.1 Verify Email OTP
* **Method:** `POST`
* **Path:** `/api/v1/auth/verification/verify`
* **Rate Limit:** 10 requests / minute / IP
* **Authentication:** None
* **Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```
* **Success Status:** `200 OK`
* **Response Body:**
```json
{
  "success": true,
  "data": {
    "verified": true,
    "message": "Email verified successfully."
  }
}
```
* **Errors:**
  - `400 OTP_INVALID` — Incorrect 6-digit code
  - `400 OTP_EXPIRED` — Code has expired (10-minute lifetime)
  - `400 OTP_MAX_ATTEMPTS` — Maximum attempts reached (5 attempts limit)
  - `400 EMAIL_ALREADY_VERIFIED` — Email already verified

---

### 3.2 Resend Verification OTP
* **Method:** `POST`
* **Path:** `/api/v1/auth/verification/resend`
* **Rate Limit:** 10 requests / minute / IP
* **Authentication:** None
* **Request Body:**
```json
{
  "email": "user@example.com"
}
```
* **Success Status:** `200 OK`
* **Response Body:**
```json
{
  "success": true,
  "data": {
    "message": "Verification code sent."
  }
}
```
* **Errors:**
  - `400 OTP_RESEND_COOLDOWN` — Must wait 60 seconds between resend requests

---

## 4. Password Recovery Endpoints

### 4.1 Request Password Reset OTP
* **Method:** `POST`
* **Path:** `/api/v1/auth/password-reset/request`
* **Rate Limit:** 10 requests / minute / IP
* **Authentication:** None
* **Request Body:**
```json
{
  "email": "user@example.com"
}
```
* **Success Status:** `200 OK`
* **Response Body (Enumeration Protected):**
```json
{
  "success": true,
  "data": {
    "message": "If the email is registered, a password reset code has been sent."
  }
}
```

---

### 4.2 Verify Password Reset OTP
* **Method:** `POST`
* **Path:** `/api/v1/auth/password-reset/verify`
* **Rate Limit:** 10 requests / minute / IP
* **Authentication:** None
* **Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "654321"
}
```
* **Success Status:** `200 OK`
* **Response Body:**
```json
{
  "success": true,
  "data": {
    "resetToken": "64_character_hex_reset_token",
    "message": "OTP verified. Use reset token to complete password reset."
  }
}
```

---

### 4.3 Complete Password Reset
* **Method:** `POST`
* **Path:** `/api/v1/auth/password-reset/complete`
* **Rate Limit:** 10 requests / minute / IP
* **Authentication:** None
* **Request Body:**
```json
{
  "resetToken": "64_character_hex_reset_token",
  "newPassword": "NewStrongPassword456!"
}
```
* **Success Status:** `200 OK`
* **Response Body:**
```json
{
  "success": true,
  "data": {
    "message": "Password updated successfully. All previous sessions have been revoked."
  }
}
```
* **Post-Condition:** All active user sessions and refresh tokens are invalidated server-side. Fresh login required.

---

## 5. Account Security Endpoints

### 5.1 Change Password
* **Method:** `POST`
* **Path:** `/api/v1/auth/change-password`
* **Rate Limit:** 10 requests / minute / IP
* **Authentication:** `Bearer <ACCESS_TOKEN>`
* **Request Body:**
```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "BrandNewPassword789!"
}
```
* **Success Status:** `200 OK`
* **Response Body:**
```json
{
  "success": true,
  "data": {
    "message": "Password changed successfully. All sessions have been revoked."
  }
}
```
* **Errors:**
  - `400 CURRENT_PASSWORD_INVALID` — Current password does not match
  - `400 PASSWORD_SAME_AS_CURRENT` — New password matches current password
  - `400 VALIDATION_ERROR` — New password does not meet complexity rules
* **Post-Condition:** All user sessions and refresh tokens are revoked across all devices. Local client must clear stored tokens and require fresh login.

---

### 5.2 Account Security Status
* **Method:** `GET`
* **Path:** `/api/v1/auth/security`
* **Authentication:** `Bearer <ACCESS_TOKEN>`
* **Success Status:** `200 OK`
* **Response Body:**
```json
{
  "success": true,
  "data": {
    "email": "user@example.com",
    "emailVerified": true,
    "emailVerifiedAt": "2026-09-01T12:05:00.000Z",
    "activeSessions": 1,
    "passwordUpdatedAt": "2026-09-01T12:30:00.000Z",
    "accountLocked": false,
    "lockedUntil": null,
    "failedLoginAttempts": 0
  }
}
```
