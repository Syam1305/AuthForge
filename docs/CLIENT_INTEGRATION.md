# AuthForge — Client Integration Guide

This guide details how client applications (such as **LoginLab**, **DairyKhata**, mobile apps, and web frontends) integrate with AuthForge using the client SDK or direct REST API communication.

---

## 1. System Architecture

AuthForge acts as the sole centralized authentication and identity authority:

```text
┌─────────────────────────────┐
│      Client Application     │
│                             │
│ LoginLab / DairyKhata / ... │
│                             │
│  • @authforge/client SDK    │
│  • Secure Token Storage     │
│  • Reactive Auth State      │
└──────────────┬──────────────┘
               │
               │ HTTPS / JSON REST (/api/v1/auth/*)
               ▼
┌─────────────────────────────┐
│          AuthForge          │
│                             │
│  • Access Tokens (JWT)      │
│  • Refresh Token Rotation   │
│  • Session Authorization    │
│  • Lockout & Rate Limiting  │
└──────────────┬──────────────┘
               │
               │ Prisma ORM
               ▼
┌─────────────────────────────┐
│         PostgreSQL          │
│          authforge          │
└─────────────────────────────┘
```

> [!IMPORTANT]
> **Zero Database Access:** Client applications MUST NEVER connect directly to PostgreSQL or possess `DATABASE_URL`. All authentication and session operations occur strictly over HTTPS REST endpoints.

---

## 2. Client Environment Configuration

Client applications only require the AuthForge public API base URL:

```env
# Client Application .env
AUTHFORGE_BASE_URL=https://auth.yourdomain.com
```

In local development:
```env
AUTHFORGE_BASE_URL=http://localhost:4000
```

> [!CAUTION]
> NEVER include `DATABASE_URL`, `JWT_ACCESS_SECRET`, `OTP_SECRET`, or server-side credentials in client environment files or client bundles.

---

## 3. TypeScript / JavaScript Integration (`@authforge/client`)

### 3.1 Installation
```bash
npm install @authforge/client
```

### 3.2 Initialization
```typescript
import { AuthForgeClient, WebStorageAdapter } from '@authforge/client';

export const auth = new AuthForgeClient({
  baseUrl: process.env.AUTHFORGE_BASE_URL || 'http://localhost:4000',
  tokenStorage: new WebStorageAdapter('authforge_tokens'),
  autoRestore: true // Automatically checks and restores session on startup
});
```

### 3.3 Auth State Subscription
```typescript
auth.state.subscribe((state, user) => {
  switch (state) {
    case 'loading':
      renderLoadingSpinner();
      break;
    case 'authenticated':
      renderAppDashboard(user);
      break;
    case 'unauthenticated':
      renderLoginForm();
      break;
  }
});
```

### 3.4 Registration & Email Verification
```typescript
// 1. Register user
const { user } = await auth.register({
  email: 'user@example.com',
  password: 'StrongPassword123!',
  firstName: 'Jane',
  lastName: 'Doe'
});

// 2. Verify 6-digit OTP code sent to user email
await auth.verifyEmail('user@example.com', '123456');
```

### 3.5 Login & Session Management
```typescript
// Login with credentials
const { user, accessToken, refreshToken } = await auth.login({
  email: 'user@example.com',
  password: 'StrongPassword123!'
});

// Fetch authenticated profile
const profile = await auth.getMe();

// List active sessions
const sessions = await auth.listSessions();

// Revoke a specific session
await auth.revokeSession(sessions[1].id);

// Logout current session
await auth.logout();

// Logout all devices
await auth.logoutAll();
```

### 3.6 Password Recovery & Change
```typescript
// 1. Request password reset OTP
await auth.requestPasswordReset('user@example.com');

// 2. Verify reset OTP and receive single-use resetToken
const { resetToken } = await auth.verifyPasswordResetOtp('user@example.com', '654321');

// 3. Complete reset with new password
await auth.completePasswordReset(resetToken, 'NewStrongPassword456!');

// 4. Change password while logged in (revokes all other sessions)
await auth.changePassword({
  currentPassword: 'OldPassword123!',
  newPassword: 'BrandNewPassword789!'
});
```

---

## 4. Mobile Integration (Flutter / Dart Example)

For Flutter client applications (such as DairyKhata mobile app), use `flutter_secure_storage` for storing the rotated token pair:

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthForgeService {
  final String baseUrl;
  final FlutterSecureStorage _storage = const FlutterSecureStorage();
  
  AuthForgeService({this.baseUrl = 'https://auth.yourdomain.com'});

  Future<void> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/v1/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body)['data'];
      await _storage.write(key: 'access_token', value: data['accessToken']);
      await _storage.write(key: 'refresh_token', value: data['refreshToken']);
    } else {
      throw Exception('Login failed: ${response.body}');
    }
  }

  Future<Map<String, dynamic>> getMe() async {
    String? token = await _storage.read(key: 'access_token');
    
    var response = await http.get(
      Uri.parse('$baseUrl/api/v1/auth/me'),
      headers: {'Authorization': 'Bearer $token'},
    );

    // If access token is expired, rotate refresh token
    if (response.statusCode == 401) {
      await refreshTokens();
      token = await _storage.read(key: 'access_token');
      response = await http.get(
        Uri.parse('$baseUrl/api/v1/auth/me'),
        headers: {'Authorization': 'Bearer $token'},
      );
    }

    return jsonDecode(response.body)['data']['user'];
  }

  Future<void> refreshTokens() async {
    final refreshToken = await _storage.read(key: 'refresh_token');
    final response = await http.post(
      Uri.parse('$baseUrl/api/v1/auth/refresh'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'refreshToken': refreshToken}),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body)['data'];
      await _storage.write(key: 'access_token', value: data['accessToken']);
      await _storage.write(key: 'refresh_token', value: data['refreshToken']);
    } else {
      await _storage.deleteAll();
      throw Exception('Session expired. Please log in again.');
    }
  }
}
```

---

## 5. Token Handling & Single-Flight Refresh Architecture

```text
Request 1 ──┐
Request 2 ──┼──> [ Single-Flight Refresh Mutex ] ──> POST /api/v1/auth/refresh
Request 3 ──┘                      │
                                   ▼
                 [ Save Rotated Tokens Atomically ]
                                   │
               ┌───────────────────┴───────────────────┐
               ▼                                       ▼
  Retry Request 1 (Success)               Retry Request 2 & 3 (Success)
```

1. **Single-Flight Concurrency:** Multiple parallel API calls that discover an expired access token share a single active refresh operation.
2. **Atomic Token Pair Replacement:** When refresh succeeds, both `accessToken` and `refreshToken` are updated together in storage.
3. **Replay Invalidation Handling:** If a refresh token replay is detected, the server returns `401 REFRESH_TOKEN_REUSED` and revokes the session. The client immediately wipes local tokens and displays the login screen.

---

## 6. Non-Negotiable Client Security Rules

1. **Never connect directly to PostgreSQL:** Clients communicate exclusively via HTTPS REST endpoints.
2. **Never ship database credentials or JWT secrets in client code:** All signing and validation occurs server-side.
3. **Never log credentials:** Passwords, OTPs, access tokens, refresh tokens, and reset tokens must never be written to console or log aggregators.
4. **Use platform secure storage:** Store refresh credentials in secure storage (`Keychain` on iOS, `EncryptedSharedPreferences` on Android).
5. **Never blindly retry refresh requests:** AuthForge refresh tokens are single-use; blindly retrying a consumed token triggers replay detection and revokes the session.
6. **Treat AuthForge as the authorization authority:** Ownership checks are strictly enforced by the backend.
7. **Always enforce HTTPS in production.**
