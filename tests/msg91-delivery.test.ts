import { Msg91SmsDeliveryProvider } from '../src/providers/msg91-sms-delivery.provider.js';
import { DevelopmentSmsDeliveryProvider, HybridSmsDeliveryProvider } from '../src/providers/sms-delivery.provider.js';
import { PhoneUtil } from '../src/utils/phone.js';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
  }
}

// Global fetch mock helper
const originalFetch = global.fetch;

interface MockFetchRecord {
  url: string;
  options: RequestInit;
}

let mockFetchCalls: MockFetchRecord[] = [];
let mockFetchHandler: ((url: string, options: RequestInit) => Promise<Response>) | null = null;

function setupMockFetch(handler: (url: string, options: RequestInit) => Promise<Response>) {
  mockFetchCalls = [];
  mockFetchHandler = handler;
  global.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const urlStr = typeof input === 'string' ? input : input.toString();
    const opts = init || {};
    mockFetchCalls.push({ url: urlStr, options: opts });
    if (mockFetchHandler) {
      return mockFetchHandler(urlStr, opts);
    }
    return new Response(JSON.stringify({ type: 'success', message: 'OTP sent' }), { status: 200 });
  }) as typeof fetch;
}

function restoreFetch() {
  global.fetch = originalFetch;
  mockFetchCalls = [];
  mockFetchHandler = null;
}

async function runMsg91Tests() {
  console.log('========================================================');
  console.log('🧪 RUNNING AUTHFORGE MSG91 SMS DELIVERY PROVIDER TESTS');
  console.log('========================================================\n');

  // --- 1. Configuration & Detection ---
  console.log('--- 1. Configuration Detection & Validation ---');
  const unconfigured = new Msg91SmsDeliveryProvider({ authKey: '', templateId: '' });
  assert(!unconfigured.isConfigured(), '1. Provider with empty authKey & templateId reports isConfigured() === false');

  const missingKey = new Msg91SmsDeliveryProvider({ authKey: '', templateId: 'template_123' });
  assert(!missingKey.isConfigured(), '3. Provider missing AuthKey reports isConfigured() === false');

  const missingTemplate = new Msg91SmsDeliveryProvider({ authKey: 'authkey_123', templateId: '' });
  assert(!missingTemplate.isConfigured(), '4. Provider missing TemplateId reports isConfigured() === false');

  const configured = new Msg91SmsDeliveryProvider({ authKey: 'valid_auth_key_123', templateId: 'template_default_123' });
  assert(configured.isConfigured(), '2. Provider with valid AuthKey and TemplateId reports isConfigured() === true');

  const verifyUnconfigured = await unconfigured.verifyConnection();
  assert(!verifyUnconfigured.success && verifyUnconfigured.error !== undefined, 'verifyConnection returns false when unconfigured');

  const verifyConfigured = await configured.verifyConnection();
  assert(verifyConfigured.success, 'verifyConnection returns true without sending SMS when configured');

  // --- 2. Phone Formatting & Transport Representation ---
  console.log('\n--- 2. Phone Normalization & MSG91 Transport Formatting ---');
  const rawIndianPhone = '+91 98765-43210';
  const normalized = PhoneUtil.normalize(rawIndianPhone);
  assert(normalized === '+919876543210', '6. Phone normalization formats to canonical E.164 (+919876543210)');

  const transportFormatted = Msg91SmsDeliveryProvider.formatMobileForTransport(rawIndianPhone);
  assert(transportFormatted === '919876543210', '7. Transport formatter strips leading + for MSG91 (919876543210)');

  const tenDigitPhone = '9876543210';
  const transport10Digit = Msg91SmsDeliveryProvider.formatMobileForTransport(tenDigitPhone);
  assert(transport10Digit === '919876543210', 'Transport formatter prepends default country code and strips +');

  // --- 3. Request Headers, URL & Payload Structure ---
  console.log('\n--- 3. MSG91 V5 API Request Contract Verification ---');
  setupMockFetch(async (url, options) => {
    return new Response(JSON.stringify({ type: 'success', message: 'OTP sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  });

  const testAuthKey = 'AUTHKEY_SECRET_SECURE_999';
  const testTemplateId = 'TEMPLATE_BASE_111';
  const testOtp = '583214';
  const testPhone = '+919876543210';

  const provider = new Msg91SmsDeliveryProvider({
    authKey: testAuthKey,
    templateId: testTemplateId
  });

  await provider.sendVerificationCode(testPhone, testOtp);

  assert(mockFetchCalls.length === 1, 'Provider makes exactly 1 HTTP call (no duplicate calls)');
  const call = mockFetchCalls[0];
  const urlObj = new URL(call.url);

  assert(urlObj.origin + urlObj.pathname === 'https://control.msg91.com/api/v5/otp', 'Requests the official MSG91 V5 SendOTP endpoint');
  assert(call.options.method === 'POST', 'Uses POST HTTP method');

  const headers = call.options.headers as Record<string, string>;
  assert(headers['authkey'] === testAuthKey, '8. Passes AuthKey in request header');
  assert(headers['Content-Type'] === 'application/json', 'Specifies Content-Type: application/json');

  assert(urlObj.searchParams.get('template_id') === testTemplateId, '9. Template ID matches expected template');
  assert(urlObj.searchParams.get('mobile') === '919876543210', 'Mobile query parameter contains formatted number (919876543210)');
  assert(urlObj.searchParams.get('otp') === testOtp, '10. AuthForge-generated OTP is passed unchanged in request query');
  assert(urlObj.searchParams.get('otp_expiry') === '10', '11. otp_expiry is set to 10 minutes');
  assert(urlObj.searchParams.get('realTimeResponse') === '1', 'realTimeResponse is enabled');

  const parsedBody = JSON.parse(call.options.body as string);
  assert(parsedBody.otp === testOtp && parsedBody.OTP === testOtp, '10b. AuthForge-generated OTP is injected into JSON request body');

  // --- 4. Purpose-Specific Template Resolution ---
  console.log('\n--- 4. Purpose-Specific Template Selection ---');
  const multiTemplateProvider = new Msg91SmsDeliveryProvider({
    authKey: testAuthKey,
    templateId: 'TEMPLATE_FALLBACK',
    verifyTemplateId: 'TEMPLATE_VERIFY_CUSTOM',
    loginTemplateId: 'TEMPLATE_LOGIN_CUSTOM',
    resetTemplateId: 'TEMPLATE_RESET_CUSTOM'
  });

  // Verify
  mockFetchCalls = [];
  await multiTemplateProvider.sendVerificationCode(testPhone, '111111');
  const verifyCall = new URL(mockFetchCalls[0].url);
  assert(verifyCall.searchParams.get('template_id') === 'TEMPLATE_VERIFY_CUSTOM', '12. Verification uses MSG91_VERIFY_TEMPLATE_ID');

  // Login
  mockFetchCalls = [];
  await multiTemplateProvider.sendLoginCode(testPhone, '222222');
  const loginCall = new URL(mockFetchCalls[0].url);
  assert(loginCall.searchParams.get('template_id') === 'TEMPLATE_LOGIN_CUSTOM', '13. Login uses MSG91_LOGIN_TEMPLATE_ID');

  // Reset
  mockFetchCalls = [];
  await multiTemplateProvider.sendPasswordResetCode(testPhone, '333333');
  const resetCall = new URL(mockFetchCalls[0].url);
  assert(resetCall.searchParams.get('template_id') === 'TEMPLATE_RESET_CUSTOM', '14. Password reset uses MSG91_RESET_TEMPLATE_ID');

  // Fallback
  const fallbackProvider = new Msg91SmsDeliveryProvider({
    authKey: testAuthKey,
    templateId: 'TEMPLATE_FALLBACK_ONLY'
  });
  mockFetchCalls = [];
  await fallbackProvider.sendLoginCode(testPhone, '444444');
  const fallbackCall = new URL(mockFetchCalls[0].url);
  assert(fallbackCall.searchParams.get('template_id') === 'TEMPLATE_FALLBACK_ONLY', '15. Falls back to MSG91_TEMPLATE_ID when purpose template is unset');

  // --- 5. Provider Response Handling & Error Scenarios ---
  console.log('\n--- 5. Provider Response Handling & Error Scenarios ---');
  
  // 16. Successful Response
  setupMockFetch(async () => new Response(JSON.stringify({ type: 'success', message: 'OTP dispatched' }), { status: 200 }));
  let successThrown = false;
  try {
    await provider.sendVerificationCode(testPhone, '123456');
  } catch {
    successThrown = true;
  }
  assert(!successThrown, '16. Successful 200 OK provider response resolves cleanly');

  // 17. Malformed 200 OK Rejection (e.g. type: error)
  setupMockFetch(async () => new Response(JSON.stringify({ type: 'error', message: 'Invalid mobile number format' }), { status: 200 }));
  let rejectedCaught = false;
  let rejectedMsg = '';
  try {
    await provider.sendVerificationCode(testPhone, '123456');
  } catch (err: any) {
    rejectedCaught = true;
    rejectedMsg = err.message;
  }
  assert(rejectedCaught && rejectedMsg.includes('Invalid mobile number format'), '17. 200 OK with type: error is caught as delivery failure');

  // 18. HTTP 400 Bad Request
  setupMockFetch(async () => new Response(JSON.stringify({ message: 'Template not approved or missing' }), { status: 400 }));
  let http400Caught = false;
  try {
    await provider.sendVerificationCode(testPhone, '123456');
  } catch (err: any) {
    http400Caught = true;
  }
  assert(http400Caught, '18. HTTP 400 Bad Request throws delivery error');

  // 19. HTTP 401 Invalid AuthKey
  setupMockFetch(async () => new Response(JSON.stringify({ message: 'Invalid AuthKey provided' }), { status: 401 }));
  let http401Caught = false;
  let http401Msg = '';
  try {
    await provider.sendVerificationCode(testPhone, '123456');
  } catch (err: any) {
    http401Caught = true;
    http401Msg = err.message;
  }
  assert(http401Caught && !http401Msg.includes(testAuthKey), '19 & 26. HTTP 401 Invalid AuthKey throws error without leaking AuthKey secret');

  // 20. HTTP 403 Forbidden
  setupMockFetch(async () => new Response(JSON.stringify({ message: 'Account suspended or IP blocked' }), { status: 403 }));
  let http403Caught = false;
  try {
    await provider.sendVerificationCode(testPhone, '123456');
  } catch {
    http403Caught = true;
  }
  assert(http403Caught, '20. HTTP 403 Forbidden throws delivery error');

  // 21. HTTP 429 Rate Limit
  setupMockFetch(async () => new Response(JSON.stringify({ message: 'Rate limit exceeded' }), { status: 429 }));
  let http429Caught = false;
  try {
    await provider.sendVerificationCode(testPhone, '123456');
  } catch {
    http429Caught = true;
  }
  assert(http429Caught, '21. HTTP 429 Rate limit throws delivery error');

  // 22. HTTP 500 Upstream Server Error
  setupMockFetch(async () => new Response('Internal Gateway Error', { status: 500 }));
  let http500Caught = false;
  try {
    await provider.sendVerificationCode(testPhone, '123456');
  } catch {
    http500Caught = true;
  }
  assert(http500Caught, '22. HTTP 500 Upstream Server Error throws delivery error');

  // 23. Timeout Handling
  setupMockFetch(async () => {
    const error = new Error('The operation was aborted');
    error.name = 'TimeoutError';
    throw error;
  });
  let timeoutCaught = false;
  try {
    await provider.sendVerificationCode(testPhone, '123456');
  } catch (err: any) {
    timeoutCaught = true;
  }
  assert(timeoutCaught, '23. Network TimeoutError is caught and converted to controlled failure');

  // 24. Network Error
  setupMockFetch(async () => {
    throw new Error('fetch failed: ECONNRESET');
  });
  let networkCaught = false;
  try {
    await provider.sendVerificationCode(testPhone, '123456');
  } catch {
    networkCaught = true;
  }
  assert(networkCaught, '24. Network connection reset / fetch failure is handled safely');

  // 25. Malformed JSON response
  setupMockFetch(async () => new Response('<html><head><title>502 Bad Gateway</title></head></html>', { status: 502 }));
  let malformedJsonCaught = false;
  try {
    await provider.sendVerificationCode(testPhone, '123456');
  } catch {
    malformedJsonCaught = true;
  }
  assert(malformedJsonCaught, '25. Malformed non-JSON response does not crash process');

  // 27 & 28. Sensitive Data & OTP Masking
  setupMockFetch(async () => new Response(JSON.stringify({ message: 'Failed to deliver' }), { status: 400 }));
  let errorMsg = '';
  try {
    await provider.sendVerificationCode(testPhone, 'SECRET_OTP_998877');
  } catch (err: any) {
    errorMsg = err.message;
  }
  assert(!errorMsg.includes('SECRET_OTP_998877'), '27. Provider error message never leaks plaintext OTP');
  assert(!errorMsg.includes(testAuthKey), '28. Provider error message never leaks AuthKey secret');

  // 29. No Automatic Retry Causing Duplicate SMS
  mockFetchCalls = [];
  setupMockFetch(async () => new Response(JSON.stringify({ message: 'Gateway busy' }), { status: 503 }));
  try {
    await provider.sendVerificationCode(testPhone, '123456');
  } catch {}
  assert(mockFetchCalls.length === 1, '29. Failed request is NOT retried blindly (prevents duplicate SMS charges/delivery)');

  // --- 6. Hybrid & Development Provider Isolation ---
  console.log('\n--- 6. Hybrid & Development Provider Isolation ---');
  
  // 30. Development Provider Remains Free & Deterministic
  const devProvider = new DevelopmentSmsDeliveryProvider();
  await devProvider.sendVerificationCode(testPhone, '654321');
  const capturedDevOtp = DevelopmentSmsDeliveryProvider.getDevSmsOtp('verify', testPhone);
  assert(capturedDevOtp === '654321', '30. DevelopmentSmsDeliveryProvider captures OTP in dev sandbox without network calls');

  // 31. Explicit Provider Selection in Hybrid Provider
  const mockMsg91 = new Msg91SmsDeliveryProvider({ authKey: 'mock_key', templateId: 'mock_tpl' });
  let msg91Called = false;
  setupMockFetch(async () => {
    msg91Called = true;
    return new Response(JSON.stringify({ type: 'success' }), { status: 200 });
  });

  const hybridMsg91 = new HybridSmsDeliveryProvider(mockMsg91);
  await hybridMsg91.sendLoginCode(testPhone, '888999');
  assert(msg91Called, '31. HybridSmsDeliveryProvider routes to Msg91SmsDeliveryProvider when configured');

  // 32. Missing Production Configuration Fails Safely
  const unconfiguredMsg91 = new Msg91SmsDeliveryProvider({ authKey: '', templateId: '' });
  const hybridUnconfigured = new HybridSmsDeliveryProvider(unconfiguredMsg91);
  const oldNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  let prodFailureCaught = false;
  try {
    await hybridUnconfigured.sendVerificationCode(testPhone, '112233');
  } catch (err: any) {
    prodFailureCaught = true;
  } finally {
    process.env.NODE_ENV = oldNodeEnv;
  }
  assert(prodFailureCaught, '32. Unconfigured provider in production fails safely and does NOT silently send dev OTPs');

  restoreFetch();

  console.log('\n========================================================');
  console.log(`🏁 MSG91 UNIT TESTS COMPLETE: ${passedTests}/${totalTests} PASSED (${failedTests} failures)`);
  console.log('========================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runMsg91Tests().catch((err) => {
  restoreFetch();
  console.error('Fatal test error:', err);
  process.exit(1);
});
