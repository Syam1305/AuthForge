import { SmtpOtpDeliveryProvider, DevelopmentOtpDeliveryProvider, HybridOtpDeliveryProvider } from '../src/providers/otp-delivery.provider.js';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    throw new Error(message);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

async function runSmtpDeliveryTests() {
  console.log('========================================================');
  console.log('🧪 RUNNING AUTHFORGE SMTP & HYBRID OTP DELIVERY TESTS');
  console.log('========================================================\n');

  // --- TEST 1: SmtpOtpDeliveryProvider configuration detection ---
  console.log('--- 1. SMTP Provider Configuration Detection ---');
  const unconfiguredProvider = new SmtpOtpDeliveryProvider({
    host: '',
    user: '',
    pass: ''
  });
  assert(!unconfiguredProvider.isConfigured(), 'Unconfigured provider reports isConfigured() === false');

  const partialProvider = new SmtpOtpDeliveryProvider({
    host: 'smtp.gmail.com',
    user: 'test@gmail.com',
    pass: ''
  });
  assert(!partialProvider.isConfigured(), 'Provider with missing password reports isConfigured() === false');

  const configuredProvider = new SmtpOtpDeliveryProvider({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    user: 'testuser@gmail.com',
    pass: '16charapppassword',
    from: 'AuthForge <no-reply@authforge.dev>'
  });
  assert(configuredProvider.isConfigured(), 'Fully specified provider reports isConfigured() === true');

  // --- TEST 2: Unconfigured verifyConnection ---
  console.log('\n--- 2. Unconfigured Provider Connection Verification ---');
  const verifyResult = await unconfiguredProvider.verifyConnection();
  assert(verifyResult.success === false, 'Unconfigured provider verifyConnection returns success = false');
  assert(Boolean(verifyResult.error), 'Unconfigured provider provides error reason');

  // --- TEST 3: Hybrid Provider Fallback when SMTP is Unconfigured ---
  console.log('\n--- 3. Hybrid Provider Fallback to Dev Sandbox ---');
  const devProvider = new DevelopmentOtpDeliveryProvider();
  const hybridUnconfigured = new HybridOtpDeliveryProvider(unconfiguredProvider, devProvider);

  const testEmail = `test.smtp.fallback.${Date.now()}@example.com`;
  const testOtp = '123456';

  await hybridUnconfigured.sendVerificationCode(testEmail, testOtp);
  const capturedVerifyOtp = DevelopmentOtpDeliveryProvider.getDevOtp('verify', testEmail);
  assert(capturedVerifyOtp === testOtp, 'Hybrid provider successfully falls back to dev sandbox for verification');

  const resetEmail = `test.smtp.reset.${Date.now()}@example.com`;
  const resetOtp = '654321';
  await hybridUnconfigured.sendPasswordResetCode(resetEmail, resetOtp);
  const capturedResetOtp = DevelopmentOtpDeliveryProvider.getDevOtp('reset', resetEmail);
  assert(capturedResetOtp === resetOtp, 'Hybrid provider successfully falls back to dev sandbox for password reset');

  // --- TEST 4: Email Content & Security Warning Formatting ---
  console.log('\n--- 4. Email Template & Security Notice Verification ---');
  let capturedMailOptions: any = null;
  const mockSmtpProvider = new SmtpOtpDeliveryProvider({
    host: 'smtp.gmail.com',
    user: 'sender@gmail.com',
    pass: 'mockpassword'
  });

  // Attach mock transporter sendMail interceptor
  (mockSmtpProvider as any).transporter = {
    sendMail: async (options: any) => {
      capturedMailOptions = options;
      return { messageId: 'mock-123' };
    },
    verify: async () => true
  };

  // Test Verification Email
  await mockSmtpProvider.sendVerificationCode('recipient@example.com', '789012');
  assert(capturedMailOptions !== null, 'SMTP transporter sendMail was invoked');
  assert(capturedMailOptions.to === 'recipient@example.com', 'Recipient email matches');
  assert(capturedMailOptions.subject.includes('Verify Your Email Address'), 'Subject has AuthForge verification branding');
  assert(capturedMailOptions.text.includes('789012'), 'Plain text contains OTP');
  assert(capturedMailOptions.text.includes('10 minutes'), 'Plain text contains 10m expiration notice');
  assert(capturedMailOptions.text.includes('Never share this verification code'), 'Plain text contains security notice');
  assert(capturedMailOptions.html.includes('789012'), 'HTML contains 6-digit OTP code');
  assert(capturedMailOptions.html.includes('AuthForge'), 'HTML contains AuthForge branding');
  assert(capturedMailOptions.html.includes('Security Notice'), 'HTML contains security warning');

  // Test Password Reset Email
  capturedMailOptions = null;
  await mockSmtpProvider.sendPasswordResetCode('recipient@example.com', '987654');
  assert(capturedMailOptions !== null, 'Password reset SMTP sendMail was invoked');
  assert(capturedMailOptions.to === 'recipient@example.com', 'Password reset recipient email matches');
  assert(capturedMailOptions.subject.includes('Password Reset'), 'Password reset subject has AuthForge branding');
  assert(capturedMailOptions.text.includes('987654'), 'Password reset plain text contains OTP');
  assert(capturedMailOptions.text.includes('10 minutes'), 'Password reset text contains 10m expiration notice');
  assert(capturedMailOptions.text.includes('Never share this recovery code'), 'Password reset contains security warning');
  assert(capturedMailOptions.html.includes('987654'), 'Password reset HTML contains 6-digit OTP code');
  assert(capturedMailOptions.html.includes('Security Notice'), 'Password reset HTML contains security notice');

  // --- TEST 5: Mock SMTP Delivery via Hybrid Provider ---
  console.log('\n--- 5. Hybrid Provider Active SMTP Delegation ---');
  let hybridSmtpDelivered = false;
  const activeSmtpMock = new SmtpOtpDeliveryProvider({
    host: 'smtp.gmail.com',
    user: 'mock@gmail.com',
    pass: 'mockpass'
  });
  (activeSmtpMock as any).transporter = {
    sendMail: async () => {
      hybridSmtpDelivered = true;
      return { messageId: 'mock-456' };
    }
  };

  const hybridActive = new HybridOtpDeliveryProvider(activeSmtpMock);
  await hybridActive.sendVerificationCode('active@example.com', '112233');
  assert(hybridSmtpDelivered === true, 'Hybrid provider cleanly routes to SMTP when configured');

  console.log('\n========================================================');
  console.log('🎉 ALL SMTP & HYBRID OTP DELIVERY TESTS PASSED! (100%)');
  console.log('========================================================\n');
}

runSmtpDeliveryTests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('FATAL SMTP TEST ERROR:', err);
    process.exit(1);
  });
