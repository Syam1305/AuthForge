# @authforge/client

Official TypeScript/JavaScript Client SDK for **AuthForge**. Provides centralized authentication, secure token storage abstraction, automated single-flight refresh token rotation, reactive authentication state, session management, password recovery, and error handling for client applications (such as LoginLab and DairyKhata).

---

## Features

* **Complete API Support:** Full coverage of AuthForge registration, login, profile, sessions, OTP verification, password reset, and account security endpoints.
* **Single-Flight Refresh Mutex:** Guarantees that multiple concurrent API requests on an expired access token trigger exactly **one** network refresh call. All concurrent requests wait and seamlessly retry with the rotated access token.
* **Secure Token Lifecycle:** Automatically handles access token attachment and atomic refresh token rotation.
* **Pluggable Token Storage:** `InMemoryTokenStorage` (default safe memory store), `WebStorageAdapter` (browser localStorage/sessionStorage), or custom async storage (e.g. Flutter Secure Storage / React Native Keychain).
* **Reactive Auth State:** Subscribe to authentication lifecycle changes (`loading`, `authenticated`, `unauthenticated`).
* **Zero Secret Leakage:** Never logs passwords, tokens, or OTP values.

---

## Installation

```bash
npm install @authforge/client
```

---

## Quick Start

```typescript
import { AuthForgeClient, WebStorageAdapter } from '@authforge/client';

// Initialize client
const auth = new AuthForgeClient({
  baseUrl: 'https://auth.yourdomain.com', // or 'http://localhost:4000' in development
  tokenStorage: new WebStorageAdapter('my_app_tokens')
});

// 1. Subscribe to auth state changes
auth.state.subscribe((state, user) => {
  console.log(`Auth state: ${state}, User:`, user?.email);
});

// 2. Login
await auth.login({
  email: 'user@example.com',
  password: 'StrongPassword123!'
});

// 3. Make authenticated API calls
const profile = await auth.getMe();
console.log('Logged in user:', profile);

// 4. List and manage sessions
const sessions = await auth.listSessions();
console.log('Active devices:', sessions);

// 5. Logout
await auth.logout();
```
