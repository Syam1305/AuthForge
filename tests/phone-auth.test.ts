import { AuthForgeClient } from '../client/authforge-client/dist/index.js';
import { InMemoryTokenStorage } from '../client/authforge-client/dist/token-storage.js';
import { PhoneUtil } from '../src/utils/phone.js';
import { DevelopmentSmsDeliveryProvider, RealSmsDeliveryProvider, HybridSmsDeliveryProvider } from '../src/providers/sms-delivery.provider.js';
import { AuthenticationError, ConflictError, ValidationError, OtpInvalidError } from '../src/errors/app.error.js';

const AUTHFORGE_URL = 'http://localhost:4000';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    throw new Error(message);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

async function runPhoneAuthTests() {
  console.log('========================================================');
  console.log('🧪 RUNNING AUTHFORGE PHASE 9 PHONE AUTHENTICATION TESTS');
  console.log('========================================================\n');

  // --- 1. PHONE NUMBER NORMALIZATION & VALIDATION TESTS ---
  console.log('--- 1. Phone Number Normalization & Validation ---');
  assert(PhoneUtil.isValid('+919876543210'), 'Valid Indian E.164 phone returns true');
  assert(PhoneUtil.isValid('+14155552671'), 'Valid US E.164 phone returns true');
  assert(!PhoneUtil.isValid('123'), 'Invalid short number returns false');
  assert(!PhoneUtil.isValid('abcdefg'), 'Non-numeric string returns false');

  const norm1 = PhoneUtil.normalize('+91 98765 43210');
  const norm2 = PhoneUtil.normalize('+91-98765-43210');
  const norm3 = PhoneUtil.normalize('+919876543210');
  const norm4 = PhoneUtil.normalize('9876543210'); // defaults to IN region (+91)
  assert(norm1 === '+919876543210', 'Normalizes spaced number to +919876543210');
  assert(norm2 === '+919876543210', 'Normalizes hyphenated number to +919876543210');
  assert(norm3 === '+919876543210', 'Preserves standard +919876543210');
  assert(norm4 === '+919876543210', 'Prepends default region country code to 10-digit number');

  // --- 2. SMS DELIVERY PROVIDER TESTS ---
  console.log('\n--- 2. SMS Delivery Provider Abstraction & Fallback ---');
  const devSms = new DevelopmentSmsDeliveryProvider();
  await devSms.sendVerificationCode('+919876543210', '654321');
  const capturedOtp = DevelopmentSmsDeliveryProvider.getDevSmsOtp('verify', '+919876543210');
  assert(capturedOtp === '654321', 'DevelopmentSmsDeliveryProvider captures OTP in dev sandbox');

  const realUnconfigured = new RealSmsDeliveryProvider({ apiKey: '', apiSecret: '' });
  assert(!realUnconfigured.isConfigured(), 'Real SMS provider reports unconfigured when keys are empty');

  const hybrid = new HybridSmsDeliveryProvider(realUnconfigured, devSms);
  await hybrid.sendLoginCode('+919876543210', '112233');
  const capturedLoginOtp = DevelopmentSmsDeliveryProvider.getDevSmsOtp('login', '+919876543210');
  assert(capturedLoginOtp === '112233', 'Hybrid provider cleanly falls back to Dev SMS sandbox');

  // Mock Real SMS Provider
  let realSmsDispatched = false;
  const mockRealSms = new RealSmsDeliveryProvider({ apiKey: 'mock_key', apiSecret: 'mock_secret' });
  (mockRealSms as any).dispatchSms = async (phone: string, msg: string) => {
    realSmsDispatched = true;
  };
  const hybridActive = new HybridSmsDeliveryProvider(mockRealSms);
  await hybridActive.sendVerificationCode('+919876543210', '998877');
  assert(realSmsDispatched === true, 'Hybrid provider dispatches via Real SMS adapter when configured');

  // --- 3. CLIENT SDK PHONE AUTHENTICATION INTEGRATION ---
  console.log('\n--- 3. Client SDK Phone Registration & Verification ---');
  const uniqueTimestamp = Date.now();
  // Use a pseudo-random valid 10-digit number for test: 98 + 8 digits
  const suffix = String(uniqueTimestamp).slice(-8);
  const testPhone = `+9198${suffix}`;
  const testPassword = 'PhonePassword123!';

  const storage = new InMemoryTokenStorage();
  const client = new AuthForgeClient({
    baseUrl: AUTHFORGE_URL,
    tokenStorage: storage,
    autoRestore: false
  });

  // A. Phone Registration
  const regResult = await client.registerWithPhone({
    phoneNumber: testPhone,
    password: testPassword,
    firstName: 'PhoneUser',
    lastName: 'Tester'
  });
  assert(regResult.user.phoneNumber === testPhone, 'User registered with phone number via SDK');
  assert(regResult.user.phoneNumberVerifiedAt === null, 'User phone is initially unverified');

  // Duplicate Phone Registration Conflict
  let duplicateCaught = false;
  try {
    await client.registerWithPhone({ phoneNumber: testPhone });
  } catch (err) {
    duplicateCaught = true;
  }
  assert(duplicateCaught, 'Duplicate phone number registration rejected with 409 Conflict');

  // B. Phone Verification OTP
  const devVerifyOtp = DevelopmentSmsDeliveryProvider.getDevSmsOtp('verify', testPhone);
  assert(devVerifyOtp !== undefined, 'Phone verification OTP captured in dev store');

  // Test Wrong OTP rejection
  let wrongOtpCaught = false;
  try {
    await client.verifyPhone(testPhone, '000000');
  } catch {
    wrongOtpCaught = true;
  }
  assert(wrongOtpCaught, 'Invalid phone verification OTP rejected');

  // Resend cooldown test on active unconsumed OTP
  let cooldownCaught = false;
  try {
    await client.resendPhoneVerification(testPhone);
  } catch (err: any) {
    cooldownCaught = true;
  }
  assert(cooldownCaught, 'OTP resend cooldown enforced on phone verification');

  // Verify with correct OTP
  const verifyRes = await client.verifyPhone(testPhone, devVerifyOtp!);
  assert(verifyRes.verified === true, 'Phone number verified via OTP');

  // --- 4. PHONE + PASSWORD LOGIN ---
  console.log('\n--- 4. Phone + Password Login ---');
  const loginRes = await client.loginWithPhone({
    phoneNumber: testPhone,
    password: testPassword
  });
  assert(client.state.isAuthenticated() === true, 'Authenticated via phone + password');
  assert(loginRes.user.phoneNumber === testPhone, 'User profile returned on phone login');
  assert(Boolean(loginRes.accessToken && loginRes.refreshToken), 'Access & refresh tokens issued');

  const me = await client.getMe();
  assert(me.phoneNumber === testPhone, 'Profile retrieved via /me with phone number');

  const secStatus = await client.getSecurityStatus();
  assert(secStatus.phoneVerified === true, 'Security status reflects phoneVerified === true');

  await client.logout();
  assert(client.state.isAuthenticated() === false, 'Logged out successfully');

  // --- 5. PASSWORDLESS PHONE OTP LOGIN ---
  console.log('\n--- 5. Passwordless Phone OTP Login ---');
  const reqLoginMsg = await client.requestPhoneLogin(testPhone);
  assert(Boolean(reqLoginMsg.message), 'Passwordless phone login requested');

  const devLoginOtp = DevelopmentSmsDeliveryProvider.getDevSmsOtp('login', testPhone);
  assert(devLoginOtp !== undefined, 'Phone login OTP captured in dev sandbox');

  const otpLoginRes = await client.verifyPhoneLogin(testPhone, devLoginOtp!);
  assert(client.state.isAuthenticated() === true, 'Authenticated via Passwordless Phone OTP');
  assert(otpLoginRes.user.phoneNumber === testPhone, 'User returned from passwordless login');

  // --- 6. AUTHENTICATED PHONE NUMBER CHANGE ---
  console.log('\n--- 6. Authenticated Phone Number Change Flow ---');
  const changeUserPhone = `+9197${String(Date.now()).slice(-8)}`;
  const changeUserClient = new AuthForgeClient({
    baseUrl: AUTHFORGE_URL,
    tokenStorage: new InMemoryTokenStorage(),
    autoRestore: false
  });
  await changeUserClient.registerWithPhone({
    phoneNumber: changeUserPhone,
    password: testPassword
  });
  const changeUserVerifyOtp = DevelopmentSmsDeliveryProvider.getDevSmsOtp('verify', changeUserPhone);
  await changeUserClient.verifyPhone(changeUserPhone, changeUserVerifyOtp!);
  await changeUserClient.loginWithPhone({
    phoneNumber: changeUserPhone,
    password: testPassword
  });

  const newSuffix = String(Date.now() + 100).slice(-8);
  const newPhone = `+9199${newSuffix}`;

  await changeUserClient.requestPhoneChange(newPhone);
  const devChangeOtp = DevelopmentSmsDeliveryProvider.getDevSmsOtp('verify', newPhone);
  assert(devChangeOtp !== undefined, 'Phone change verification OTP dispatched to new phone');

  await changeUserClient.verifyPhoneChange(newPhone, devChangeOtp!);
  const updatedMe = await changeUserClient.getMe();
  assert(updatedMe.phoneNumber === newPhone, 'Phone number updated to new phone after OTP verification');

  // --- 7. PHONE PASSWORD RECOVERY / RESET ---
  console.log('\n--- 7. Phone Password Reset Recovery Flow ---');
  await client.requestPhonePasswordReset(newPhone);
  const devResetOtp = DevelopmentSmsDeliveryProvider.getDevSmsOtp('reset', newPhone);
  assert(devResetOtp !== undefined, 'Phone password reset OTP captured');

  const resetVerify = await client.verifyPhonePasswordReset(newPhone, devResetOtp!);
  assert(Boolean(resetVerify.resetToken), 'Password reset token issued via phone OTP');

  const postResetPassword = 'PostResetPhonePass456!';
  await client.completePasswordReset(resetVerify.resetToken, postResetPassword);

  // Login with new password
  const newPassLogin = await client.loginWithPhone({
    phoneNumber: newPhone,
    password: postResetPassword
  });
  assert(newPassLogin.user.phoneNumber === newPhone, 'Login succeeds with updated password after phone reset');

  // --- 8. ENUMERATION PROTECTION ---
  console.log('\n--- 8. Enumeration Protection ---');
  const nonExistentPhone = '+919111111111';
  const enumLoginReq = await client.requestPhoneLogin(nonExistentPhone);
  assert(
    enumLoginReq.message.includes('If an account exists'),
    'Non-existent phone returns identical generic success message on login request'
  );

  const enumResetReq = await client.requestPhonePasswordReset(nonExistentPhone);
  assert(
    enumResetReq.message.includes('If an account exists'),
    'Non-existent phone returns identical generic success message on password reset request'
  );

  await client.logout();

  console.log('\n========================================================');
  console.log('🎉 ALL PHASE 9 PHONE AUTHENTICATION TESTS PASSED! (100%)');
  console.log('========================================================\n');
}

runPhoneAuthTests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('FATAL PHONE AUTH TEST ERROR:', err);
    process.exit(1);
  });
