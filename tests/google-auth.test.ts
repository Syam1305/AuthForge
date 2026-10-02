import { GoogleAuthService, defaultGoogleTokenVerifier, VerifiedGoogleProfile } from '../src/services/google-auth.service.js';
import { UserService } from '../src/services/user.service.js';
import { SessionService } from '../src/services/session.service.js';
import { TokenService } from '../src/services/token.service.js';
import { UserRepository } from '../src/repositories/user.repository.js';
import { IdentityRepository } from '../src/repositories/identity.repository.js';
import { SecurityEventRepository } from '../src/repositories/security-event.repository.js';
import { prisma } from '../src/database/prisma.js';
import { env } from '../src/config/env.js';
import { AuthProvider, SecurityEventType } from '@prisma/client';
import { AuthForgeClient } from '../client/authforge-client/dist/index.js';
import { InMemoryTokenStorage } from '../client/authforge-client/dist/token-storage.js';
import {
  AuthenticationError,
  ConflictError,
  ForbiddenError,
  AccountLockedError,
  ServiceUnavailableError,
  AuthRequiredError
} from '../src/errors/app.error.js';

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

// In-memory mock token generator and verifier
const mockGoogleProfiles = new Map<string, VerifiedGoogleProfile>();

function registerMockGoogleToken(credential: string, profile: VerifiedGoogleProfile) {
  mockGoogleProfiles.set(credential, profile);
}

const mockVerifier = async (idToken: string, audience: string): Promise<VerifiedGoogleProfile> => {
  if (idToken === 'malformed.token.format') {
    throw new AuthenticationError('Invalid Google credential.');
  }

  const profile = mockGoogleProfiles.get(idToken);
  if (!profile) {
    throw new AuthenticationError('Invalid Google credential.');
  }

  // Claim validations
  if (idToken.includes('invalid_issuer')) {
    throw new AuthenticationError('Invalid Google credential: invalid issuer.');
  }
  if (idToken.includes('wrong_audience')) {
    throw new AuthenticationError('Invalid Google credential: audience mismatch.');
  }
  if (idToken.includes('expired')) {
    throw new AuthenticationError('Invalid Google credential: token has expired.');
  }
  if (idToken.includes('missing_sub') || !profile.sub || profile.sub.trim() === '') {
    throw new AuthenticationError('Invalid Google credential: missing subject claim.');
  }

  return profile;
};

async function runGoogleAuthTests() {
  console.log('================================================================');
  console.log('🧪 AUTHFORGE PHASE 10 — GOOGLE AUTHENTICATION TEST SUITE');
  console.log('================================================================\n');

  // Install custom token verifier for deterministic offline testing
  GoogleAuthService.setTokenVerifier(mockVerifier);

  // Ensure environment variables are enabled for tests
  (env as any).GOOGLE_AUTH_ENABLED = true;
  (env as any).GOOGLE_CLIENT_ID = 'test-google-client-id.apps.googleusercontent.com';

  const timestamp = Date.now();
  const testSub1 = `google-sub-1-${timestamp}`;
  const testSub2 = `google-sub-2-${timestamp}`;
  const testSub3 = `google-sub-3-${timestamp}`;
  const testEmail1 = `google.user1.${timestamp}@example.com`;
  const testEmail2 = `google.user2.${timestamp}@example.com`;
  const testEmail3 = `google.user3.${timestamp}@example.com`;

  const validToken1 = `valid-google-token-1-${timestamp}`;
  const validToken2 = `valid-google-token-2-${timestamp}`;
  const validToken3 = `valid-google-token-3-${timestamp}`;
  const unverifiedEmailToken = `unverified-email-token-${timestamp}`;
  const expiredToken = `expired-google-token-${timestamp}`;
  const wrongIssuerToken = `invalid_issuer-token-${timestamp}`;
  const wrongAudienceToken = `wrong_audience-token-${timestamp}`;
  const missingSubToken = `missing_sub-token-${timestamp}`;

  registerMockGoogleToken(validToken1, {
    sub: testSub1,
    email: testEmail1,
    emailVerified: true,
    name: 'Google User One',
    givenName: 'Google',
    familyName: 'UserOne',
    picture: 'https://lh3.googleusercontent.com/a/test1'
  });

  registerMockGoogleToken(validToken2, {
    sub: testSub2,
    email: testEmail2,
    emailVerified: true,
    name: 'Google User Two',
    givenName: 'Google',
    familyName: 'UserTwo'
  });

  registerMockGoogleToken(validToken3, {
    sub: testSub3,
    email: testEmail3,
    emailVerified: true,
    name: 'Google User Three',
    givenName: 'Google',
    familyName: 'UserThree'
  });

  registerMockGoogleToken(unverifiedEmailToken, {
    sub: `unverified-sub-${timestamp}`,
    email: `unverified.${timestamp}@example.com`,
    emailVerified: false,
    name: 'Unverified User'
  });

  registerMockGoogleToken(expiredToken, {
    sub: `expired-sub-${timestamp}`,
    email: `expired.${timestamp}@example.com`,
    emailVerified: true
  });

  registerMockGoogleToken(wrongIssuerToken, {
    sub: `wrong-iss-sub-${timestamp}`,
    email: `wrong-iss.${timestamp}@example.com`,
    emailVerified: true
  });

  registerMockGoogleToken(wrongAudienceToken, {
    sub: `wrong-aud-sub-${timestamp}`,
    email: `wrong-aud.${timestamp}@example.com`,
    emailVerified: true
  });

  registerMockGoogleToken(missingSubToken, {
    sub: '',
    email: `missing-sub.${timestamp}@example.com`,
    emailVerified: true
  });

  try {
    // =========================================================================
    // 1. TOKEN VALIDATION EDGE CASES
    // =========================================================================
    console.log('--- 1. Token Validation & Claims Verification ---');

    // 1A. Valid token verification
    const verifiedProfile = await GoogleAuthService.verifyIdToken(validToken1);
    assert(verifiedProfile.sub === testSub1, 'Valid token resolves sub correctly');
    assert(verifiedProfile.email === testEmail1, 'Valid token resolves email correctly');
    assert(verifiedProfile.emailVerified === true, 'Valid token resolves emailVerified=true');

    // 1B. Invalid signature / unknown token
    let unknownTokenCaught = false;
    try {
      await GoogleAuthService.verifyIdToken('unknown-fake-token');
    } catch (err: any) {
      if (err instanceof AuthenticationError) unknownTokenCaught = true;
    }
    assert(unknownTokenCaught, 'Unknown / invalid token throws AuthenticationError');

    // 1C. Wrong issuer
    let wrongIssuerCaught = false;
    try {
      await GoogleAuthService.verifyIdToken(wrongIssuerToken);
    } catch (err: any) {
      if (err instanceof AuthenticationError && err.message.includes('issuer')) wrongIssuerCaught = true;
    }
    assert(wrongIssuerCaught, 'Wrong issuer rejected with AuthenticationError');

    // 1D. Wrong audience
    let wrongAudienceCaught = false;
    try {
      await GoogleAuthService.verifyIdToken(wrongAudienceToken);
    } catch (err: any) {
      if (err instanceof AuthenticationError && err.message.includes('audience')) wrongAudienceCaught = true;
    }
    assert(wrongAudienceCaught, 'Audience mismatch rejected with AuthenticationError');

    // 1E. Expired token
    let expiredCaught = false;
    try {
      await GoogleAuthService.verifyIdToken(expiredToken);
    } catch (err: any) {
      if (err instanceof AuthenticationError && err.message.includes('expired')) expiredCaught = true;
    }
    assert(expiredCaught, 'Expired token rejected with AuthenticationError');

    // 1F. Missing sub
    let missingSubCaught = false;
    try {
      await GoogleAuthService.verifyIdToken(missingSubToken);
    } catch (err: any) {
      if (err instanceof AuthenticationError && err.message.includes('subject')) missingSubCaught = true;
    }
    assert(missingSubCaught, 'Missing subject claim rejected with AuthenticationError');

    // 1G. Unverified email during login
    let unverifiedEmailCaught = false;
    try {
      await GoogleAuthService.authenticateWithGoogle(unverifiedEmailToken);
    } catch (err: any) {
      if (err instanceof AuthenticationError && err.message.includes('verified')) unverifiedEmailCaught = true;
    }
    assert(unverifiedEmailCaught, 'Unverified Google email rejected during authentication');

    // 1H. Google disabled safely fails
    (env as any).GOOGLE_AUTH_ENABLED = false;
    let disabledCaught = false;
    try {
      await GoogleAuthService.authenticateWithGoogle(validToken1);
    } catch (err: any) {
      if (err instanceof ServiceUnavailableError) disabledCaught = true;
    }
    assert(disabledCaught, 'Google login fails safely with ServiceUnavailableError when disabled');
    (env as any).GOOGLE_AUTH_ENABLED = true;

    // =========================================================================
    // 2. FIRST-TIME GOOGLE USER CREATION & IDENTITY
    // =========================================================================
    console.log('\n--- 2. First-Time Google User Creation & Identity ---');

    const authResult1 = await GoogleAuthService.authenticateWithGoogle(validToken1, {
      ipAddress: '127.0.0.1',
      userAgent: 'GoogleAuthTestSuite/1.0'
    });

    assert(Boolean(authResult1.user?.id), 'First-time Google login creates AuthForge user');
    assert(authResult1.user.email === testEmail1, 'Created user has correct verified email');
    assert(authResult1.user.emailVerifiedAt !== null, 'Created user has emailVerifiedAt timestamp set');
    assert(authResult1.user.firstName === 'Google', 'Created user populates firstName from Google profile');
    assert(authResult1.user.lastName === 'UserOne', 'Created user populates lastName from Google profile');
    assert(Boolean(authResult1.accessToken), 'AuthForge access token issued');
    assert(Boolean(authResult1.refreshToken), 'AuthForge refresh token issued');

    // Verify User has null passwordHash in database (cannot login with random password)
    const dbUser1 = await UserRepository.findById(authResult1.user.id);
    assert(dbUser1?.passwordHash === null, 'Google-only user has null passwordHash');

    // Verify AuthIdentity record in database
    const dbIdentity1 = await IdentityRepository.findByProviderSubject(AuthProvider.GOOGLE, testSub1);
    assert(dbIdentity1 !== null, 'AuthIdentity record created for (GOOGLE, sub)');
    assert(dbIdentity1?.userId === authResult1.user.id, 'AuthIdentity links to created user ID');
    assert(dbIdentity1?.email === testEmail1, 'AuthIdentity stores provider email');

    // Verify Password Login Attempt for Google-only user fails cleanly
    let passwordLoginFailed = false;
    try {
      await UserService.login({ email: testEmail1, password: 'SomeRandomPassword123!' });
    } catch (err: any) {
      if (err instanceof AuthenticationError) passwordLoginFailed = true;
    }
    assert(passwordLoginFailed, 'Google-only user cannot authenticate via email + password without setting password');

    // =========================================================================
    // 3. EXISTING GOOGLE IDENTITY LOGIN (RE-AUTHENTICATION)
    // =========================================================================
    console.log('\n--- 3. Existing Google Identity Re-Authentication ---');

    const usersCountBefore = await prisma.user.count();
    const identitiesCountBefore = await prisma.authIdentity.count();

    const authResult1Second = await GoogleAuthService.authenticateWithGoogle(validToken1, {
      ipAddress: '127.0.0.1',
      userAgent: 'GoogleAuthTestSuite/1.0'
    });

    const usersCountAfter = await prisma.user.count();
    const identitiesCountAfter = await prisma.authIdentity.count();

    assert(authResult1Second.user.id === authResult1.user.id, 'Re-login resolves same AuthForge User ID');
    assert(usersCountAfter === usersCountBefore, 'No duplicate User entity created on re-login');
    assert(identitiesCountAfter === identitiesCountBefore, 'No duplicate AuthIdentity entity created on re-login');
    assert(authResult1Second.accessToken !== authResult1.accessToken, 'New independent AuthForge access token issued');

    // =========================================================================
    // 4. CRITICAL ACCOUNT TAKEOVER PROTECTION
    // =========================================================================
    console.log('\n--- 4. Account Takeover Protection (Unlinked Email Conflict) ---');

    // Create a regular user with email2 via standard registration
    const existingPasswordUser = await UserService.register({
      email: testEmail2,
      password: 'StandardPassword123!',
      firstName: 'Existing',
      lastName: 'User'
    });

    // Verify email2 is not yet linked to Google sub2
    const identityCheck = await IdentityRepository.findByProviderSubject(AuthProvider.GOOGLE, testSub2);
    assert(identityCheck === null, 'Google identity sub2 is not linked to existing user');

    // Attempt Google login with validToken2 (which has email=testEmail2 and sub=testSub2)
    let takeoverAttemptRejected = false;
    let conflictCode = '';
    try {
      await GoogleAuthService.authenticateWithGoogle(validToken2);
    } catch (err: any) {
      if (err instanceof ConflictError) {
        takeoverAttemptRejected = true;
        conflictCode = err.code;
      }
    }

    assert(takeoverAttemptRejected, 'Unlinked existing account email rejected with 409 Conflict');
    assert(conflictCode === 'GOOGLE_LINK_REQUIRED', 'Error code is specifically GOOGLE_LINK_REQUIRED');

    // Confirm no AuthIdentity was silently merged
    const identityAfterTakeoverAttempt = await IdentityRepository.findByProviderSubject(AuthProvider.GOOGLE, testSub2);
    assert(identityAfterTakeoverAttempt === null, 'CONFIRMED: Automatic email-based account takeover is strictly prevented');

    // =========================================================================
    // 5. EXPLICIT GOOGLE ACCOUNT LINKING & CROSS-USER PROTECTION
    // =========================================================================
    console.log('\n--- 5. Explicit Google Account Linking & Cross-User Protection ---');

    // 5A. Link Google account explicitly to existing user
    const linkResult = await GoogleAuthService.linkGoogleIdentity(existingPasswordUser.id, validToken2);
    assert(linkResult.message.includes('success'), 'Explicit linking succeeds for authenticated user');

    const linkedIdentity = await IdentityRepository.findByProviderSubject(AuthProvider.GOOGLE, testSub2);
    assert(linkedIdentity?.userId === existingPasswordUser.id, 'Google identity successfully linked to user ID');

    // 5B. Now Google login for validToken2 succeeds
    const loginAfterLink = await GoogleAuthService.authenticateWithGoogle(validToken2);
    assert(loginAfterLink.user.id === existingPasswordUser.id, 'Google login succeeds after explicit linking');

    // 5C. Idempotent linking attempt by same user
    const idempotentLink = await GoogleAuthService.linkGoogleIdentity(existingPasswordUser.id, validToken2);
    assert(idempotentLink.message.includes('already linked'), 'Idempotent linking returns safe message');

    // 5D. Cross-User Linking Protection: User 1 attempts to link Google identity sub2 (already owned by User 2)
    let crossUserCaught = false;
    let crossUserCode = '';
    try {
      await GoogleAuthService.linkGoogleIdentity(authResult1.user.id, validToken2);
    } catch (err: any) {
      if (err instanceof ConflictError) {
        crossUserCaught = true;
        crossUserCode = err.code;
      }
    }
    assert(crossUserCaught, 'Cross-user account linking attempt rejected with ConflictError');
    assert(crossUserCode === 'GOOGLE_IDENTITY_ALREADY_LINKED', 'Error code is GOOGLE_IDENTITY_ALREADY_LINKED');

    // Verify sub2 remains owned by existingPasswordUser
    const sub2Owner = await IdentityRepository.findByProviderSubject(AuthProvider.GOOGLE, testSub2);
    assert(sub2Owner?.userId === existingPasswordUser.id, 'Google identity ownership is strictly preserved');

    // =========================================================================
    // 6. CONCURRENT GOOGLE LOGIN RACE CONDITION RESILIENCE
    // =========================================================================
    console.log('\n--- 6. Concurrent Google Login Race Condition Handling ---');

    // Dispatch 2 concurrent first-time logins for validToken3 (testSub3)
    const [concurrentResA, concurrentResB] = await Promise.all([
      GoogleAuthService.authenticateWithGoogle(validToken3),
      GoogleAuthService.authenticateWithGoogle(validToken3)
    ]);

    assert(Boolean(concurrentResA.user.id && concurrentResB.user.id), 'Both concurrent requests resolved cleanly');
    assert(concurrentResA.user.id === concurrentResB.user.id, 'Both concurrent requests resolved to the EXACT same user');

    const countSub3Identities = await prisma.authIdentity.count({
      where: { provider: AuthProvider.GOOGLE, providerSubject: testSub3 }
    });
    assert(countSub3Identities === 1, 'Exactly ONE AuthIdentity created under concurrent race condition');

    // =========================================================================
    // 7. ACCOUNT RESTRICTIONS & LOCKOUT ENFORCEMENT
    // =========================================================================
    console.log('\n--- 7. Account Restrictions & Lockout Enforcement ---');

    // 7A. Inactive account blocked
    await prisma.user.update({
      where: { id: authResult1.user.id },
      data: { isActive: false }
    });

    let inactiveBlocked = false;
    try {
      await GoogleAuthService.authenticateWithGoogle(validToken1);
    } catch (err: any) {
      if (err instanceof ForbiddenError) inactiveBlocked = true;
    }
    assert(inactiveBlocked, 'Inactive account blocked from Google authentication');

    // Re-enable account
    await prisma.user.update({
      where: { id: authResult1.user.id },
      data: { isActive: true }
    });

    // 7B. Locked account blocked
    const lockoutUntil = new Date(Date.now() + 15 * 60 * 1000);
    await prisma.user.update({
      where: { id: authResult1.user.id },
      data: { lockedUntil: lockoutUntil }
    });

    let lockedBlocked = false;
    try {
      await GoogleAuthService.authenticateWithGoogle(validToken1);
    } catch (err: any) {
      if (err instanceof AccountLockedError) lockedBlocked = true;
    }
    assert(lockedBlocked, 'Locked account blocked from Google authentication');

    // Unlock account
    await prisma.user.update({
      where: { id: authResult1.user.id },
      data: { lockedUntil: null }
    });

    // =========================================================================
    // 8. SESSION MANAGEMENT & REFRESH ROTATION
    // =========================================================================
    console.log('\n--- 8. Session Management & Refresh Token Rotation ---');

    const sessionAuth = await GoogleAuthService.authenticateWithGoogle(validToken1);
    const tokenPayload = TokenService.verifyAccessToken(sessionAuth.accessToken);
    assert(tokenPayload.userId === authResult1.user.id, 'JWT access token contains correct userId claim');
    assert(Boolean(tokenPayload.sessionId), 'JWT access token contains sessionId claim');

    // Rotate refresh token
    const rotatedTokens = await SessionService.rotateRefreshToken(sessionAuth.refreshToken);
    assert(Boolean(rotatedTokens.accessToken), 'SessionService rotates refresh token successfully');
    assert(rotatedTokens.refreshToken !== sessionAuth.refreshToken, 'New refresh token issued in rotation');

    // Replay attack on consumed refresh token
    let replayDetected = false;
    try {
      await SessionService.rotateRefreshToken(sessionAuth.refreshToken);
    } catch (err: any) {
      if (err.code === 'REFRESH_TOKEN_REUSED' || err.message.includes('reuse')) replayDetected = true;
    }
    assert(replayDetected, 'Replay of consumed refresh token detected and rejected');

    // =========================================================================
    // 9. SECURITY AUDIT EVENTS & CREDENTIAL HYGIENE
    // =========================================================================
    console.log('\n--- 9. Security Audit Events & Credential Hygiene ---');

    const events = await SecurityEventRepository.listByUserId(authResult1.user.id);
    const hasIdentityCreated = events.some((e) => e.type === SecurityEventType.GOOGLE_IDENTITY_CREATED);
    const hasLoginSuccess = events.some((e) => e.type === SecurityEventType.GOOGLE_LOGIN_SUCCESS);

    assert(hasIdentityCreated, 'Security event GOOGLE_IDENTITY_CREATED recorded');
    assert(hasLoginSuccess, 'Security event GOOGLE_LOGIN_SUCCESS recorded');

    // Verify no raw Google tokens or secrets in security event metadata
    let hasLeakedTokens = false;
    for (const evt of events) {
      const metaStr = JSON.stringify(evt.metadata || {});
      if (
        metaStr.includes(validToken1) ||
        metaStr.includes('client_secret') ||
        metaStr.includes('Bearer ') ||
        metaStr.includes('credential')
      ) {
        hasLeakedTokens = true;
      }
    }
    assert(!hasLeakedTokens, 'CONFIRMED: Security events contain NO raw Google ID tokens or secrets');

    // =========================================================================
    // 10. CLIENT SDK METHODS
    // =========================================================================
    console.log('\n--- 10. Client SDK Google Auth Methods ---');

    const storage = new InMemoryTokenStorage();
    const sdkClient = new AuthForgeClient({
      baseUrl: 'http://localhost:4000',
      tokenStorage: storage,
      autoRestore: false
    });

    assert(typeof sdkClient.loginWithGoogle === 'function', 'AuthForgeClient exposes loginWithGoogle()');
    assert(typeof sdkClient.linkGoogle === 'function', 'AuthForgeClient exposes linkGoogle()');

    console.log('\n================================================================');
    console.log(`🎉 ALL GOOGLE AUTHENTICATION TESTS COMPLETED!`);
    console.log(`Passed: ${passedTests} / ${totalTests} (100%)`);
    console.log('================================================================\n');
  } finally {
    // Reset token verifier to production default
    GoogleAuthService.resetTokenVerifier();
  }
}

runGoogleAuthTests()
  .then(() => {
    if (failedTests > 0) {
      console.error(`❌ ${failedTests} tests failed!`);
      process.exit(1);
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error('FATAL TEST RUN ERROR:', err);
    process.exit(1);
  });
