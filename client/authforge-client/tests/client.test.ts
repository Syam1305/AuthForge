import { AuthForgeClient } from '../src/auth-client.js';
import { InMemoryTokenStorage } from '../src/token-storage.js';
import { ValidationError, AuthenticationError, AuthorizationError } from '../src/errors.js';
import { DevelopmentOtpDeliveryProvider } from '../../../dist/providers/otp-delivery.provider.js';

const BASE_URL = 'http://localhost:4000';

async function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    throw new Error(message);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

async function runClientTests() {
  console.log('========================================================');
  console.log('🚀 STARTING AUTHFORGE CLIENT SDK INTEGRATION TEST SUITE');
  console.log('========================================================\n');

  const testEmail1 = `client.user1.${Date.now()}@example.com`;
  const testEmail2 = `client.user2.${Date.now()}@example.com`;
  const password = 'StrongClientPassword123!';
  const updatedPassword = 'BrandNewClientPassword456!';

  const storage1 = new InMemoryTokenStorage();
  const client1 = new AuthForgeClient({
    baseUrl: BASE_URL,
    tokenStorage: storage1,
    autoRestore: false
  });

  // --- 1. REGISTRATION & EMAIL VERIFICATION ---
  console.log('\n--- 1. Registration & Email Verification ---');
  const regRes = await client1.register({
    email: testEmail1,
    password,
    firstName: 'SDK',
    lastName: 'Tester'
  });
  assert(regRes.user.email === testEmail1, 'client.register returns user');

  const otp = DevelopmentOtpDeliveryProvider.getDevOtp('verify', testEmail1);
  assert(otp !== undefined, 'Dev OTP captured');

  const verifyRes = await client1.verifyEmail(testEmail1, otp!);
  assert(verifyRes.verified === true, 'client.verifyEmail succeeds');

  // --- 2. LOGIN & AUTH STATE ---
  console.log('\n--- 2. Login & Auth State ---');
  assert(client1.state.isAuthenticated() === false, 'Client is initially unauthenticated');

  const loginRes = await client1.login({ email: testEmail1, password });
  assert(client1.state.isAuthenticated() === true, 'client.login updates auth state to authenticated');
  assert(client1.state.getUser()?.email === testEmail1, 'client.state.getUser returns authenticated user');
  assert(storage1.getTokens()?.accessToken !== undefined, 'Tokens saved in TokenStorage');

  // --- 3. AUTHENTICATED REQUESTS ---
  console.log('\n--- 3. Authenticated Profile, Security & Sessions ---');
  const me = await client1.getMe();
  assert(me.email === testEmail1, 'client.getMe succeeds with valid token');

  const sec = await client1.getSecurityStatus();
  assert(sec.email === testEmail1 && sec.emailVerified === true, 'client.getSecurityStatus succeeds');

  const sessions = await client1.listSessions();
  assert(Array.isArray(sessions) && sessions.length >= 1, 'client.listSessions returns active sessions array');
  const currentSession = sessions.find((s) => s.isCurrent);
  assert(currentSession !== undefined, 'Active session marked as isCurrent');

  // --- 4. CONCURRENT SINGLE-FLIGHT REFRESH PROTECTION ---
  console.log('\n--- 4. Concurrent Single-Flight Refresh Protection ---');
  const oldTokens = storage1.getTokens()!;
  
  // Intentionally set an expired/invalid accessToken in storage to trigger refresh on all concurrent calls
  storage1.saveTokens({
    ...oldTokens,
    accessToken: 'invalid.expired.jwt.token'
  });

  console.log('Dispatching 10 simultaneous authenticated requests with expired access token...');
  const concurrentCalls = Array.from({ length: 10 }, (_, i) => {
    return i % 2 === 0 ? client1.getMe() : client1.listSessions();
  });

  const results = await Promise.all(concurrentCalls);
  assert(results.length === 10, 'All 10 concurrent requests completed successfully');
  
  const newTokens = storage1.getTokens()!;
  assert(newTokens.accessToken !== 'invalid.expired.jwt.token', 'Tokens updated with rotated access token');
  assert(newTokens.refreshToken !== oldTokens.refreshToken, 'Refresh token rotated once for all 10 requests');

  // --- 5. CROSS-USER SESSION ISOLATION ---
  console.log('\n--- 5. Cross-User Session Isolation ---');
  const storage2 = new InMemoryTokenStorage();
  const client2 = new AuthForgeClient({
    baseUrl: BASE_URL,
    tokenStorage: storage2,
    autoRestore: false
  });

  await client2.register({ email: testEmail2, password });
  await client2.login({ email: testEmail2, password });
  const user2Sessions = await client2.listSessions();
  const user2SessionId = user2Sessions[0].id;

  let forbiddenErrorCaught = false;
  try {
    await client1.revokeSession(user2SessionId);
  } catch (err) {
    if (err instanceof AuthorizationError && (err as any).code === 'SESSION_FORBIDDEN') {
      forbiddenErrorCaught = true;
    }
  }
  assert(forbiddenErrorCaught, 'User 1 cannot revoke User 2 session (403 SESSION_FORBIDDEN)');

  // --- 6. CHANGE PASSWORD & ALL-SESSION INVALIDATION ---
  console.log('\n--- 6. Change Password & All-Session Invalidation ---');
  const changeRes = await client1.changePassword({
    currentPassword: password,
    newPassword: updatedPassword
  });
  assert(changeRes.message !== undefined, 'client.changePassword succeeds');
  assert(client1.state.isAuthenticated() === false, 'client state transitions to unauthenticated after password change');
  assert(storage1.getTokens() === null, 'Local tokens cleared after password change');

  // Subsequent authenticated request with old client must fail
  let authErrorCaught = false;
  try {
    await client1.getMe();
  } catch (err) {
    if (err instanceof AuthenticationError) {
      authErrorCaught = true;
    }
  }
  assert(authErrorCaught, 'Unauthenticated getMe rejected after password change');

  // Fresh login with updated password
  const freshLogin = await client1.login({ email: testEmail1, password: updatedPassword });
  assert(freshLogin.user.email === testEmail1, 'Login with new password succeeds');

  // --- 7. PASSWORD RESET FLOW ---
  console.log('\n--- 7. Password Reset Flow ---');
  await client1.requestPasswordReset(testEmail1);
  const resetOtp = DevelopmentOtpDeliveryProvider.getDevOtp('reset', testEmail1);
  assert(resetOtp !== undefined, 'Password reset OTP captured');

  const resetVerifyRes = await client1.verifyPasswordResetOtp(testEmail1, resetOtp!);
  assert(resetVerifyRes.resetToken !== undefined, 'client.verifyPasswordResetOtp returns resetToken');

  const finalPassword = 'FinalResetPassword789!';
  await client1.completePasswordReset(resetVerifyRes.resetToken, finalPassword);

  const loginAfterReset = await client1.login({ email: testEmail1, password: finalPassword });
  assert(loginAfterReset.user.email === testEmail1, 'Login with post-reset password succeeds');

  // --- 8. LOGOUT & LOGOUT-ALL ---
  console.log('\n--- 8. Logout & Logout-All ---');
  await client1.logout();
  assert(client1.state.isAuthenticated() === false, 'client.logout sets state to unauthenticated');
  assert(storage1.getTokens() === null, 'client.logout clears token storage');

  // Log in again and test logoutAll
  await client1.login({ email: testEmail1, password: finalPassword });
  assert(client1.state.isAuthenticated() === true, 'Re-login succeeds');

  await client1.logoutAll();
  assert(client1.state.isAuthenticated() === false, 'client.logoutAll sets state to unauthenticated');
  assert(storage1.getTokens() === null, 'client.logoutAll clears token storage');

  console.log('\n========================================================');
  console.log('🎉 ALL CLIENT SDK INTEGRATION TESTS PASSED! (100%)');
  console.log('========================================================\n');
}

runClientTests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('FATAL CLIENT TEST ERROR:', err);
    process.exit(1);
  });
