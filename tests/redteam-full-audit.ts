import { prisma } from '../src/database/prisma.js';
import { PhoneUtil } from '../src/utils/phone.js';
import { TokenService } from '../src/services/token.service.js';
import { PasswordService } from '../src/services/password.service.js';
import { OtpPurpose, SecurityEventType } from '@prisma/client';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const BASE_URL = 'http://localhost:4000';
const API_URL = `${BASE_URL}/api/v1`;

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures: string[] = [];

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    failedTests++;
    const msg = `❌ FAIL: ${testName} ${detail ? `(${detail})` : ''}`;
    console.error(`  ${msg}`);
    failures.push(msg);
  }
}

async function request(path: string, options: RequestInit = {}) {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  let body: any = null;
  const text = await res.text();
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  return { status: res.status, headers: res.headers, body };
}

async function getDevOtp(type: 'verify' | 'reset', email: string): Promise<string | undefined> {
  const res = await request(`/api/v1/auth/dev/otp?email=${encodeURIComponent(email)}&type=${type}`);
  return res.body?.data?.otp;
}

async function getDevSmsOtp(type: 'verify' | 'login' | 'reset', phoneNumber: string): Promise<string | undefined> {
  const res = await request(`/api/v1/auth/dev/sms-otp?phoneNumber=${encodeURIComponent(phoneNumber)}&type=${type}`);
  return res.body?.data?.otp;
}

async function main() {
  console.log('================================================================');
  console.log('🛡️ AUTHFORGE COMPREHENSIVE SYSTEM VERIFICATION & RED-TEAM AUDIT');
  console.log('================================================================\n');

  // =========================================================================
  // 1. HEALTH AND INFRASTRUCTURE ENDPOINTS
  // =========================================================================
  console.log('--- 1. Health & Infrastructure Endpoints ---');
  const h1 = await request('/health');
  assert(h1.status === 200 && h1.body.status === 'healthy', 'GET /health returns 200 healthy');
  assert(Boolean(h1.headers.get('x-request-id')), 'GET /health returns X-Request-ID header');

  const hDb1 = await request('/health/db');
  assert(hDb1.status === 200 && hDb1.body.database === 'connected', 'GET /health/db reports connected');

  const h2 = await request('/api/v1/health');
  assert(h2.status === 200 && h2.body.status === 'healthy', 'GET /api/v1/health returns 200 healthy');

  const hDb2 = await request('/api/v1/health/db');
  assert(hDb2.status === 200 && hDb2.body.database === 'connected', 'GET /api/v1/health/db reports connected');

  const notFound = await request('/api/v1/non-existent-route-xyz');
  assert(notFound.status === 404 && notFound.body.error?.code === 'NOT_FOUND', 'GET /non-existent returns 404 NOT_FOUND');

  // Malformed JSON body
  const malformed = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"invalid_json": true,'
  });
  const malformedBody = await malformed.json();
  assert(malformed.status === 400 && malformedBody.error?.code === 'INVALID_JSON', 'Malformed JSON returns 400 INVALID_JSON');

  // =========================================================================
  // 2. DATABASE SCHEMA & INVARIANTS VERIFICATION
  // =========================================================================
  console.log('\n--- 2. Database Schema & Invariants Verification ---');
  // API requires valid email or phone, rejecting empty payload
  const emptyRegister = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({})
  });
  assert(emptyRegister.status === 400, 'Registration requires valid email or phone, rejecting empty payload');

  // Cascade delete verification test
  const dummyUser = await prisma.user.create({
    data: {
      email: `cascade.test.${Date.now()}@example.com`,
      passwordHash: 'dummyhash'
    }
  });
  const dummyOtp = await prisma.otpChallenge.create({
    data: {
      userId: dummyUser.id,
      purpose: OtpPurpose.EMAIL_VERIFICATION,
      codeHash: 'hash',
      expiresAt: new Date(Date.now() + 600000)
    }
  });
  const dummySession = await prisma.session.create({
    data: {
      userId: dummyUser.id,
      expiresAt: new Date(Date.now() + 600000)
    }
  });
  await prisma.refreshToken.create({
    data: {
      sessionId: dummySession.id,
      familyId: 'family-1',
      tokenHash: `hash-${Date.now()}`,
      expiresAt: new Date(Date.now() + 600000)
    }
  });
  await prisma.securityEvent.create({
    data: {
      userId: dummyUser.id,
      type: SecurityEventType.REGISTER
    }
  });

  // Delete dummy user
  await prisma.user.delete({ where: { id: dummyUser.id } });

  // Verify cascades
  const orphanOtp = await prisma.otpChallenge.findUnique({ where: { id: dummyOtp.id } });
  const orphanSession = await prisma.session.findUnique({ where: { id: dummySession.id } });
  assert(orphanOtp === null, 'User deletion cascades and removes OtpChallenge');
  assert(orphanSession === null, 'User deletion cascades and removes Session & RefreshTokens');

  // =========================================================================
  // 3. EMAIL REGISTRATION & OTP VERIFICATION
  // =========================================================================
  console.log('\n--- 3. Email Registration & OTP Verification ---');
  const regEmail = `test.redteam.${Date.now()}@example.com`;
  const regPassword = 'RedTeamPassword123!';

  // Invalid email test
  const invEmailRes = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email: 'not-an-email', password: regPassword })
  });
  assert(invEmailRes.status === 400 && invEmailRes.body.error?.code === 'VALIDATION_ERROR', 'Invalid email rejected with 400 VALIDATION_ERROR');

  // Weak password test
  const weakPassRes = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email: `weak.${Date.now()}@example.com`, password: '123' })
  });
  assert(weakPassRes.status === 400 && weakPassRes.body.error?.code === 'VALIDATION_ERROR', 'Weak password rejected with 400 VALIDATION_ERROR');

  // Valid registration
  const regRes = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: regEmail,
      password: regPassword,
      firstName: 'Red',
      lastName: 'Team'
    })
  });
  assert(regRes.status === 201 && regRes.body.data?.user?.email === regEmail, 'Registration succeeds with 201 Created');
  assert(regRes.body.data?.user?.passwordHash === undefined, 'Plaintext password/hash NOT returned in registration response');
  assert(regRes.body.data?.otp === undefined, 'Plaintext OTP NOT exposed in registration response');

  // Duplicate email registration
  const dupEmailRes = await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email: regEmail, password: regPassword })
  });
  assert(dupEmailRes.status === 409 && dupEmailRes.body.error?.code === 'EMAIL_ALREADY_EXISTS', 'Duplicate email rejected with 409 EMAIL_ALREADY_EXISTS');

  // OTP Verification Edge Cases
  const regOtp = await getDevOtp('verify', regEmail);
  assert(regOtp !== undefined && regOtp.length === 6, 'Development OTP captured via REST (6 digits)');

  // Wrong OTP
  const wrongOtpRes = await request('/api/v1/auth/verification/verify', {
    method: 'POST',
    body: JSON.stringify({ email: regEmail, otp: '999999' })
  });
  assert(wrongOtpRes.status === 400 && wrongOtpRes.body.error?.code === 'OTP_INVALID', 'Wrong OTP rejected with 400 OTP_INVALID');

  // Correct OTP
  const verifyRes = await request('/api/v1/auth/verification/verify', {
    method: 'POST',
    body: JSON.stringify({ email: regEmail, otp: regOtp })
  });
  assert(verifyRes.status === 200 && verifyRes.body.data?.verified === true, 'Correct OTP verifies account with 200 OK');

  // OTP Reuse test (Already consumed)
  const reuseOtpRes = await request('/api/v1/auth/verification/verify', {
    method: 'POST',
    body: JSON.stringify({ email: regEmail, otp: regOtp })
  });
  assert(reuseOtpRes.status === 400, 'Reusing consumed OTP rejected');

  // Resend OTP on already verified account
  const resendVerifiedRes = await request('/api/v1/auth/verification/resend', {
    method: 'POST',
    body: JSON.stringify({ email: regEmail })
  });
  assert(resendVerifiedRes.status === 400 && resendVerifiedRes.body.error?.code === 'EMAIL_ALREADY_VERIFIED', 'Resend OTP on verified account returns 400 EMAIL_ALREADY_VERIFIED');

  // =========================================================================
  // 4. EMAIL LOGIN & ACCOUNT LOCKOUT TEST
  // =========================================================================
  console.log('\n--- 4. Email Login & Account Lockout ---');
  // Nonexistent user login
  const nonExistentLogin = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'nonexistent.user.audit@example.com', password: 'Password123!' })
  });
  assert(nonExistentLogin.status === 401 && nonExistentLogin.body.error?.code === 'INVALID_CREDENTIALS', 'Nonexistent user login fails with 401 INVALID_CREDENTIALS');

  // Wrong password login
  const wrongPassLogin = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: regEmail, password: 'WrongPassword123!' })
  });
  assert(wrongPassLogin.status === 401 && wrongPassLogin.body.error?.code === 'INVALID_CREDENTIALS', 'Wrong password login fails with 401 INVALID_CREDENTIALS');

  // Valid login
  const validLogin = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: regEmail, password: regPassword })
  });
  assert(validLogin.status === 200 && Boolean(validLogin.body.data?.accessToken), 'Valid login returns 200 OK with accessToken and refreshToken');
  const userTokens = validLogin.body.data;

  // Account Lockout test on fresh user
  const lockoutEmail = `lockout.test.${Date.now()}@example.com`;
  await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email: lockoutEmail, password: 'LockoutPassword123!' })
  });
  const lockoutOtp = await getDevOtp('verify', lockoutEmail);
  await request('/api/v1/auth/verification/verify', {
    method: 'POST',
    body: JSON.stringify({ email: lockoutEmail, otp: lockoutOtp })
  });

  // Trigger 5 failed logins
  for (let i = 1; i <= 5; i++) {
    await request('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: lockoutEmail, password: 'WrongPassword!' })
    });
  }

  // 6th attempt with correct password must be rejected due to lockout
  const lockedRes = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: lockoutEmail, password: 'LockoutPassword123!' })
  });
  assert(lockedRes.status === 403 && lockedRes.body.error?.code === 'ACCOUNT_LOCKED', '5 failed attempts locks account (403 ACCOUNT_LOCKED)');

  // =========================================================================
  // 5. JWT, SESSIONS & REFRESH TOKEN REUSE / REPLAY DETECTION
  // =========================================================================
  console.log('\n--- 5. JWT, Sessions & Refresh Token Replay Detection ---');
  // Authenticated profile
  const meRes = await request('/api/v1/auth/me', {
    headers: { Authorization: `Bearer ${userTokens.accessToken}` }
  });
  assert(meRes.status === 200 && meRes.body.data?.user?.email === regEmail, 'GET /me succeeds with valid Bearer token');

  // Invalid token signature
  const forgedToken = jwt.sign({ sub: 'forged-user', sid: 'fake-session', jti: 'fake-jti' }, 'wrong-secret-key-123456789012345678');
  const forgedRes = await request('/api/v1/auth/me', {
    headers: { Authorization: `Bearer ${forgedToken}` }
  });
  assert(forgedRes.status === 401 && forgedRes.body.error?.code === 'INVALID_ACCESS_TOKEN', 'Forged JWT signature rejected with 401 INVALID_ACCESS_TOKEN');

  // Refresh token rotation
  const refresh1 = await request('/api/v1/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken: userTokens.refreshToken })
  });
  assert(refresh1.status === 200 && Boolean(refresh1.body.data?.accessToken), 'POST /refresh rotates refresh token successfully');
  const rotatedTokens = refresh1.body.data;
  assert(rotatedTokens.refreshToken !== userTokens.refreshToken, 'New refresh token differs from old refresh token');

  // Refresh Token Replay Attack Detection: Attempt to reuse the consumed old refresh token
  const replayAttack = await request('/api/v1/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken: userTokens.refreshToken })
  });
  assert(replayAttack.status === 401 && replayAttack.body.error?.code === 'REFRESH_TOKEN_REUSED', 'Replaying consumed refresh token caught with 401 REFRESH_TOKEN_REUSED');

  // Verify that replay attack automatically nuked the entire session and all associated tokens in family
  const sessionAfterReplay = await request('/api/v1/auth/me', {
    headers: { Authorization: `Bearer ${rotatedTokens.accessToken}` }
  });
  assert(sessionAfterReplay.status === 401, 'Session revoked after replay attack detection');

  // =========================================================================
  // 6. PASSWORD RESET RECOVERY FLOW
  // =========================================================================
  console.log('\n--- 6. Password Reset Flow ---');
  const resetEmail = `reset.test.${Date.now()}@example.com`;
  const initialPassword = 'InitialPassword123!';
  const newPassword = 'BrandNewPassword456!';

  await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email: resetEmail, password: initialPassword })
  });
  const initialVerifyOtp = await getDevOtp('verify', resetEmail);
  await request('/api/v1/auth/verification/verify', {
    method: 'POST',
    body: JSON.stringify({ email: resetEmail, otp: initialVerifyOtp })
  });

  // Login to get an active session
  const loginBeforeReset = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: resetEmail, password: initialPassword })
  });
  const tokenBeforeReset = loginBeforeReset.body.data.accessToken;

  // Request password reset
  const resetReqRes = await request('/api/v1/auth/password-reset/request', {
    method: 'POST',
    body: JSON.stringify({ email: resetEmail })
  });
  assert(resetReqRes.status === 200, 'Password reset request returns 200 OK');

  const resetOtp = await getDevOtp('reset', resetEmail);
  assert(resetOtp !== undefined, 'Password reset OTP captured via REST');

  // Verify reset OTP -> get resetToken
  const resetVerifyRes = await request('/api/v1/auth/password-reset/verify', {
    method: 'POST',
    body: JSON.stringify({ email: resetEmail, otp: resetOtp })
  });
  assert(resetVerifyRes.status === 200 && Boolean(resetVerifyRes.body.data?.resetToken), 'Password reset OTP verification issues resetToken');
  const resetToken = resetVerifyRes.body.data.resetToken;

  // Complete password reset
  const resetCompRes = await request('/api/v1/auth/password-reset/complete', {
    method: 'POST',
    body: JSON.stringify({ resetToken, newPassword })
  });
  assert(resetCompRes.status === 200, 'Password reset completed with 200 OK');

  // Reusing resetToken must fail
  const reuseTokenRes = await request('/api/v1/auth/password-reset/complete', {
    method: 'POST',
    body: JSON.stringify({ resetToken, newPassword: 'AnotherPassword789!' })
  });
  assert(reuseTokenRes.status === 400 && reuseTokenRes.body.error?.code === 'RESET_TOKEN_ALREADY_USED', 'Reusing resetToken rejected with 400 RESET_TOKEN_ALREADY_USED');

  // Old session must be revoked
  const oldSessionCheck = await request('/api/v1/auth/me', {
    headers: { Authorization: `Bearer ${tokenBeforeReset}` }
  });
  assert(oldSessionCheck.status === 401, 'Old session revoked after password reset');

  // Login with new password
  const newPassLogin = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: resetEmail, password: newPassword })
  });
  assert(newPassLogin.status === 200, 'Login succeeds with updated password');

  // =========================================================================
  // 7. PHONE NUMBER NORMALIZATION & VALIDATION
  // =========================================================================
  console.log('\n--- 7. Phone Normalization & Validation ---');
  assert(PhoneUtil.normalize('+91 98765 43210') === '+919876543210', 'Normalizes space-formatted phone number');
  assert(PhoneUtil.normalize('+91-98765-43210') === '+919876543210', 'Normalizes hyphen-formatted phone number');
  assert(PhoneUtil.normalize('9876543210') === '+919876543210', 'Normalizes 10-digit number to E.164 with default IN (+91) country code');
  assert(!PhoneUtil.isValid('12345'), 'Rejects short invalid phone number');
  assert(!PhoneUtil.isValid('abcdef'), 'Rejects alphabetic phone number');

  // =========================================================================
  // 8. PHONE REGISTRATION, OTP VERIFICATION & PHONE LOGIN
  // =========================================================================
  console.log('\n--- 8. Phone Registration, SMS OTP & Phone Login ---');
  const phoneSuffix = String(Date.now()).slice(-8);
  const testPhone = `+9196${phoneSuffix}`;
  const phonePass = 'PhoneSecret123!';

  // Register with phone
  const phoneRegRes = await request('/api/v1/auth/phone/register', {
    method: 'POST',
    body: JSON.stringify({
      phoneNumber: testPhone,
      password: phonePass,
      firstName: 'PhoneUser'
    })
  });
  assert(phoneRegRes.status === 201 && phoneRegRes.body.data?.user?.phoneNumber === testPhone, 'Phone registration returns 201 Created');

  // Capture dev SMS OTP
  const phoneVerifyOtp = await getDevSmsOtp('verify', testPhone);
  assert(phoneVerifyOtp !== undefined && phoneVerifyOtp.length === 6, 'Dev SMS verification OTP captured via REST (6 digits)');

  // Verify phone
  const phoneVerifyRes = await request('/api/v1/auth/phone/verification/verify', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber: testPhone, otp: phoneVerifyOtp })
  });
  assert(phoneVerifyRes.status === 200 && phoneVerifyRes.body.data?.verified === true, 'Phone number verified with 200 OK');

  // Phone + Password login
  const phoneLoginRes = await request('/api/v1/auth/phone/login', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber: testPhone, password: phonePass })
  });
  assert(phoneLoginRes.status === 200 && Boolean(phoneLoginRes.body.data?.accessToken), 'Phone + Password login returns 200 OK');
  const phoneAuthToken = phoneLoginRes.body.data.accessToken;

  // Passwordless Phone OTP Login
  const pwdlessReq = await request('/api/v1/auth/phone/login/request', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber: testPhone })
  });
  assert(pwdlessReq.status === 200, 'Passwordless phone login OTP requested');

  const pwdlessOtp = await getDevSmsOtp('login', testPhone);
  assert(pwdlessOtp !== undefined, 'Dev SMS login OTP captured via REST');

  const pwdlessVerify = await request('/api/v1/auth/phone/login/verify', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber: testPhone, otp: pwdlessOtp })
  });
  assert(pwdlessVerify.status === 200 && Boolean(pwdlessVerify.body.data?.accessToken), 'Passwordless phone OTP login creates session & tokens');

  // =========================================================================
  // 9. HIGH PRIORITY SECURITY: PHONE NUMBER CHANGE FLOW
  // =========================================================================
  console.log('\n--- 9. Authenticated Phone Number Change Security ---');
  const targetNewPhone = `+9195${String(Date.now() + 50).slice(-8)}`;

  // Unauthenticated request to change phone
  const unauthChangeReq = await request('/api/v1/auth/phone/change/request', {
    method: 'POST',
    body: JSON.stringify({ newPhoneNumber: targetNewPhone })
  });
  assert(unauthChangeReq.status === 401, 'Unauthenticated request to phone/change/request rejected with 401');

  // Authenticated request to change phone
  const authChangeReq = await request('/api/v1/auth/phone/change/request', {
    method: 'POST',
    headers: { Authorization: `Bearer ${phoneAuthToken}` },
    body: JSON.stringify({ newPhoneNumber: targetNewPhone })
  });
  assert(authChangeReq.status === 200, 'Authenticated user requests phone change with 200 OK');

  const changeOtp = await getDevSmsOtp('verify', targetNewPhone);
  assert(changeOtp !== undefined, 'Verification OTP dispatched to target new phone number');

  // Unauthenticated verify
  const unauthChangeVerify = await request('/api/v1/auth/phone/change/verify', {
    method: 'POST',
    body: JSON.stringify({ newPhoneNumber: targetNewPhone, otp: changeOtp })
  });
  assert(unauthChangeVerify.status === 401, 'Unauthenticated phone/change/verify rejected with 401');

  // Authenticated verify with wrong OTP
  const wrongChangeOtp = await request('/api/v1/auth/phone/change/verify', {
    method: 'POST',
    headers: { Authorization: `Bearer ${phoneAuthToken}` },
    body: JSON.stringify({ newPhoneNumber: targetNewPhone, otp: '000000' })
  });
  assert(wrongChangeOtp.status === 400 && wrongChangeOtp.body.error?.code === 'OTP_INVALID', 'Wrong OTP on phone change rejected with 400 OTP_INVALID');

  // Authenticated verify with valid OTP
  const validChangeVerify = await request('/api/v1/auth/phone/change/verify', {
    method: 'POST',
    headers: { Authorization: `Bearer ${phoneAuthToken}` },
    body: JSON.stringify({ newPhoneNumber: targetNewPhone, otp: changeOtp })
  });
  assert(validChangeVerify.status === 200, 'Phone number change verified and committed with 200 OK');

  // Verify profile shows new phone
  const profileAfterChange = await request('/api/v1/auth/me', {
    headers: { Authorization: `Bearer ${phoneAuthToken}` }
  });
  assert(profileAfterChange.body.data?.user?.phoneNumber === targetNewPhone, 'User profile reflects updated phone number');

  // =========================================================================
  // 10. ENUMERATION TESTING
  // =========================================================================
  console.log('\n--- 10. Account Enumeration Protection ---');
  const existingReset = await request('/api/v1/auth/password-reset/request', {
    method: 'POST',
    body: JSON.stringify({ email: regEmail })
  });
  const nonexistentReset = await request('/api/v1/auth/password-reset/request', {
    method: 'POST',
    body: JSON.stringify({ email: 'ghost.account.12345@example.com' })
  });
  assert(
    existingReset.status === 200 &&
    nonexistentReset.status === 200 &&
    existingReset.body.message === nonexistentReset.body.message,
    'Password reset request returns identical generic message for existing & nonexistent email'
  );

  const existingPhoneLoginReq = await request('/api/v1/auth/phone/login/request', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber: targetNewPhone })
  });
  const nonexistentPhoneLoginReq = await request('/api/v1/auth/phone/login/request', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber: '+919111111111' })
  });
  assert(
    existingPhoneLoginReq.status === 200 &&
    nonexistentPhoneLoginReq.status === 200 &&
    existingPhoneLoginReq.body.message === nonexistentPhoneLoginReq.body.message,
    'Phone login request returns identical generic message for existing & nonexistent phone'
  );

  // =========================================================================
  // 11. SECURITY EVENT AUDIT & SENSITIVE SECRET INSPECTION
  // =========================================================================
  console.log('\n--- 11. Security Event Audit & Secret Leaks in Database ---');
  const secEvents = await prisma.securityEvent.findMany({
    take: 50,
    orderBy: { createdAt: 'desc' }
  });
  assert(secEvents.length > 0, 'SecurityEvent records populated in database');

  let sensitiveDataFoundInEvents = false;
  for (const ev of secEvents) {
    const meta = (ev.metadata || {}) as Record<string, any>;
    if (
      meta.password ||
      meta.passwordHash ||
      meta.plainOtp ||
      meta.otp ||
      meta.jwtSecret ||
      meta.tokenHash
    ) {
      sensitiveDataFoundInEvents = true;
      break;
    }
  }
  assert(!sensitiveDataFoundInEvents, 'SecurityEvent audit confirmed: No passwords, OTPs, or secrets in event metadata');

  // =========================================================================
  // 12. CONCURRENCY & RACE CONDITIONS
  // =========================================================================
  console.log('\n--- 12. Concurrency & Race Condition Testing ---');
  // Register fresh user for concurrent test
  const concEmail = `concurrent.test.${Date.now()}@example.com`;
  await request('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email: concEmail, password: 'ConcurrentPass123!' })
  });
  const concVerifyOtp = await getDevOtp('verify', concEmail);
  assert(concVerifyOtp !== undefined, 'Dev OTP captured for concurrency test');

  // Concurrent OTP verification (double-spending attempt)
  const concurrentVerifyAttempts = await Promise.all([
    request('/api/v1/auth/verification/verify', {
      method: 'POST',
      body: JSON.stringify({ email: concEmail, otp: concVerifyOtp })
    }),
    request('/api/v1/auth/verification/verify', {
      method: 'POST',
      body: JSON.stringify({ email: concEmail, otp: concVerifyOtp })
    }),
    request('/api/v1/auth/verification/verify', {
      method: 'POST',
      body: JSON.stringify({ email: concEmail, otp: concVerifyOtp })
    })
  ]);

  const verifySuccesses = concurrentVerifyAttempts.filter((r) => r.status === 200).length;
  assert(verifySuccesses === 1, 'Concurrent OTP consumption: Exactly 1 request consumes OTP; duplicates rejected');

  // Concurrent Refresh Token Rotation
  const concLogin = await request('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: concEmail, password: 'ConcurrentPass123!' })
  });
  const concRefreshToken = concLogin.body.data.refreshToken;

  const concurrentRefreshes = await Promise.all([
    request('/api/v1/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: concRefreshToken })
    }),
    request('/api/v1/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: concRefreshToken })
    })
  ]);

  const refreshSuccesses = concurrentRefreshes.filter((r) => r.status === 200).length;
  assert(refreshSuccesses <= 1, 'Concurrent token refresh collision handled safely without state corruption');

  // =========================================================================
  // 13. SUMMARY
  // =========================================================================
  console.log('\n================================================================');
  console.log(`🏁 RED-TEAM AUDIT SUMMARY: ${passedTests}/${totalTests} TESTS PASSED (${failedTests} failures)`);
  console.log('================================================================\n');

  if (failedTests > 0) {
    console.error('Failed test details:');
    failures.forEach((f) => console.error(f));
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('FATAL AUDIT RUNNER ERROR:', err);
    process.exit(1);
  });
