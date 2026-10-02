import { AuthForgeClient } from '../../authforge-client/dist/index.js';
import { InMemoryTokenStorage } from '../../authforge-client/dist/token-storage.js';
import { DevelopmentOtpDeliveryProvider } from '../../../dist/providers/otp-delivery.provider.js';
import { AuthorizationError, AuthenticationError } from '../../authforge-client/dist/errors.js';

const AUTHFORGE_URL = 'http://localhost:4000';

async function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    throw new Error(message);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

async function runLoginLabTests() {
  console.log('========================================================');
  console.log('🧪 STARTING LOGINLAB AUTHFORGE INTEGRATION TEST SUITE');
  console.log('========================================================\n');

  const testEmail = `loginlab.${Date.now()}@example.com`;
  const password = 'StrongPassword123!';
  const updatedPassword = 'NewLoginLabPassword456!';

  const storage = new InMemoryTokenStorage();
  const auth = new AuthForgeClient({
    baseUrl: AUTHFORGE_URL,
    tokenStorage: storage,
    timeoutMs: 35000,
    autoRestore: false
  });

  // --- 1. REGISTRATION FLOW ---
  console.log('\n--- 1. LoginLab Registration Flow ---');
  const regResult = await auth.register({
    email: testEmail,
    password,
    firstName: 'LoginLab',
    lastName: 'Tester'
  });
  assert(regResult.user.email === testEmail, 'User registered via AuthForge');

  // --- 2. EMAIL VERIFICATION OTP FLOW ---
  console.log('\n--- 2. Email Verification OTP Flow ---');
  let devOtp = DevelopmentOtpDeliveryProvider.getDevOtp('verify', testEmail);
  if (!devOtp) {
    const res = await fetch(`${AUTHFORGE_URL}/api/v1/auth/dev/otp?email=${encodeURIComponent(testEmail)}&type=verify`);
    const json: any = await res.json();
    devOtp = json?.data?.otp;
  }
  assert(devOtp !== undefined, 'Dev verification OTP captured');

  const verifyResult = await auth.verifyEmail(testEmail, devOtp!);
  assert(verifyResult.verified === true, 'Email verified via AuthForge OTP');

  // --- 3. LOGIN & DASHBOARD SESSION RESTORATION ---
  console.log('\n--- 3. Login & Dashboard Session ---');
  const loginResult = await auth.login({ email: testEmail, password });
  assert(auth.state.isAuthenticated() === true, 'Auth state set to authenticated');
  assert(Boolean(loginResult.accessToken && loginResult.refreshToken), 'Received access and refresh token pair');

  const me = await auth.getMe();
  assert(me.email === testEmail && me.firstName === 'LoginLab', 'User profile retrieved via /me');

  const secStatus = await auth.getSecurityStatus();
  assert(secStatus.emailVerified === true && secStatus.activeSessions >= 1, 'Security status overview retrieved');

  // --- 4. SESSION MANAGEMENT ---
  console.log('\n--- 4. Session Listing & Revocation ---');
  // Create second session
  const storage2 = new InMemoryTokenStorage();
  const auth2 = new AuthForgeClient({ baseUrl: AUTHFORGE_URL, tokenStorage: storage2, autoRestore: false });
  await auth2.login({ email: testEmail, password });

  const sessions = await auth.listSessions();
  assert(sessions.length === 2, 'Two active sessions listed');

  const secondSession = sessions.find((s) => !s.isCurrent)!;
  await auth.revokeSession(secondSession.id);
  
  // Verify session 2 is now rejected
  let session2Revoked = false;
  try {
    await auth2.getMe();
  } catch (err) {
    if (err instanceof AuthenticationError) {
      session2Revoked = true;
    }
  }
  assert(session2Revoked, 'Revoked session 2 is rejected by AuthForge on subsequent request');

  // --- 5. SINGLE-FLIGHT CONCURRENT TOKEN REFRESH ---
  console.log('\n--- 5. Single-Flight Token Refresh ---');
  const oldTokens = storage.getTokens()!;
  storage.saveTokens({ ...oldTokens, accessToken: 'expired.invalid.jwt' });

  console.log('Dispatching 5 concurrent authenticated requests on expired token...');
  const concurrentCalls = await Promise.all([
    auth.getMe(),
    auth.getSecurityStatus(),
    auth.listSessions(),
    auth.getMe(),
    auth.getSecurityStatus()
  ]);
  assert(concurrentCalls.length === 5, 'All 5 concurrent requests succeeded via single refresh');
  assert(storage.getTokens()?.refreshToken !== oldTokens.refreshToken, 'Refresh token rotated atomically');

  // --- 6. CHANGE PASSWORD FLOW ---
  console.log('\n--- 6. Change Password & All-Session Revocation ---');
  await auth.changePassword({ currentPassword: password, newPassword: updatedPassword });
  assert(auth.state.isAuthenticated() === false, 'Auth state transitions to unauthenticated after password change');
  assert(storage.getTokens() === null, 'Local tokens cleared after password change');

  // Fresh login with updated password
  await auth.login({ email: testEmail, password: updatedPassword });
  assert(auth.state.isAuthenticated() === true, 'Login with new password succeeds');

  // --- 7. PASSWORD RESET FLOW ---
  console.log('\n--- 7. Password Reset Recovery Flow ---');
  await auth.requestPasswordReset(testEmail);
  let resetOtp = DevelopmentOtpDeliveryProvider.getDevOtp('reset', testEmail);
  if (!resetOtp) {
    const res = await fetch(`${AUTHFORGE_URL}/api/v1/auth/dev/otp?email=${encodeURIComponent(testEmail)}&type=reset`);
    const json: any = await res.json();
    resetOtp = json?.data?.otp;
  }
  assert(resetOtp !== undefined, 'Password reset OTP captured');

  const resetVerify = await auth.verifyPasswordResetOtp(testEmail, resetOtp!);
  assert(resetVerify.resetToken !== undefined, 'Reset token issued');

  const finalPassword = 'FinalResetPassword123!';
  await auth.completePasswordReset(resetVerify.resetToken, finalPassword);

  await auth.login({ email: testEmail, password: finalPassword });
  assert(auth.state.isAuthenticated() === true, 'Login with reset password succeeds');

  // --- 8. ACCOUNT LOCKOUT PROTECTION ---
  console.log('\n--- 8. Account Lockout Protection ---');
  const lockoutEmail = `lockout.loginlab.${Date.now()}@example.com`;
  await auth.register({ email: lockoutEmail, password: 'Password123!' });

  for (let i = 1; i <= 5; i++) {
    try {
      await auth.login({ email: lockoutEmail, password: 'WrongPassword' });
    } catch {}
  }

  let accountLockedCaught = false;
  try {
    await auth.login({ email: lockoutEmail, password: 'Password123!' });
  } catch (err) {
    if (err instanceof AuthorizationError && err.code === 'ACCOUNT_LOCKED') {
      accountLockedCaught = true;
    }
  }
  assert(accountLockedCaught, 'LoginLab correctly catches 403 ACCOUNT_LOCKED after 5 failed attempts');

  // --- 9. LOGOUT & LOGOUT-ALL ---
  console.log('\n--- 9. Logout ---');
  await auth.logout();
  assert(auth.state.isAuthenticated() === false, 'Logout sets unauthenticated state');
  assert(storage.getTokens() === null, 'Logout purges token storage');

  console.log('\n========================================================');
  console.log('🎉 ALL LOGINLAB INTEGRATION TESTS PASSED! (100%)');
  console.log('========================================================\n');
}

runLoginLabTests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('FATAL LOGINLAB TEST ERROR:', err);
    process.exit(1);
  });
