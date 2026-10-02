import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

export interface SmsDeliveryProvider {
  sendVerificationCode(phoneNumber: string, otp: string): Promise<void>;
  sendLoginCode(phoneNumber: string, otp: string): Promise<void>;
  sendPasswordResetCode(phoneNumber: string, otp: string): Promise<void>;
  isConfigured(): boolean;
  verifyConnection(): Promise<{ success: boolean; error?: string }>;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const devSmsStorePath = path.resolve(__dirname, '../../node_modules/.cache/dev_sms_store.json');

/**
 * Development & Test SMS OTP Delivery Provider.
 * Stores SMS OTPs in local cache for test runners and prints high-visibility ASCII console banners.
 */
export class DevelopmentSmsDeliveryProvider implements SmsDeliveryProvider {
  private static storePath = devSmsStorePath;

  private static persistDevSmsOtp(key: string, otp: string): void {
    try {
      const dir = path.dirname(this.storePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      let currentData: Record<string, string> = {};
      if (fs.existsSync(this.storePath)) {
        try {
          currentData = JSON.parse(fs.readFileSync(this.storePath, 'utf8'));
        } catch {
          currentData = {};
        }
      }
      currentData[key.trim().toLowerCase()] = otp;
      fs.writeFileSync(this.storePath, JSON.stringify(currentData, null, 2), 'utf8');
    } catch {
      // Ignored for testing helper
    }
  }

  private static printDevSmsBanner(type: 'PHONE VERIFICATION' | 'PHONE LOGIN' | 'PHONE PASSWORD RESET', phone: string, otp: string): void {
    console.log('\n' + '='.repeat(72));
    console.log(`📱 [DEV SMS DELIVERY] ${type} CODE`);
    console.log('-'.repeat(72));
    console.log(`👤 Recipient Phone : ${phone}`);
    console.log(`🔑 OTP Code        : ${otp}`);
    console.log(`⏱️  Expires In      : 10 minutes`);
    console.log(`🛡️  Mode            : DEVELOPMENT (Local Sandbox Capture)`);
    console.log('-'.repeat(72));
    console.log(`💡 Tip: Enter this 6-digit code in the LoginLab phone screen.`);
    console.log('='.repeat(72) + '\n');
  }

  public isConfigured(): boolean {
    return true;
  }

  public async verifyConnection(): Promise<{ success: boolean; error?: string }> {
    return { success: true };
  }

  public async sendVerificationCode(phoneNumber: string, otp: string): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
      DevelopmentSmsDeliveryProvider.persistDevSmsOtp(`verify:${phoneNumber}`, otp);
      DevelopmentSmsDeliveryProvider.printDevSmsBanner('PHONE VERIFICATION', phoneNumber, otp);
      logger.info(`[DEV SMS DELIVERY] Phone verification code dispatched to ${phoneNumber} (OTP: ${otp})`);
    } else {
      logger.info(`Phone verification code dispatched to ${phoneNumber}`);
    }
  }

  public async sendLoginCode(phoneNumber: string, otp: string): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
      DevelopmentSmsDeliveryProvider.persistDevSmsOtp(`login:${phoneNumber}`, otp);
      DevelopmentSmsDeliveryProvider.printDevSmsBanner('PHONE LOGIN', phoneNumber, otp);
      logger.info(`[DEV SMS DELIVERY] Phone login OTP dispatched to ${phoneNumber} (OTP: ${otp})`);
    } else {
      logger.info(`Phone login OTP dispatched to ${phoneNumber}`);
    }
  }

  public async sendPasswordResetCode(phoneNumber: string, otp: string): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
      DevelopmentSmsDeliveryProvider.persistDevSmsOtp(`reset:${phoneNumber}`, otp);
      DevelopmentSmsDeliveryProvider.printDevSmsBanner('PHONE PASSWORD RESET', phoneNumber, otp);
      logger.info(`[DEV SMS DELIVERY] Phone password reset code dispatched to ${phoneNumber} (OTP: ${otp})`);
    } else {
      logger.info(`Phone password reset code dispatched to ${phoneNumber}`);
    }
  }

  /**
   * Helper for automated test runners and dev inspection to retrieve the test SMS OTP in development mode.
   */
  public static getDevSmsOtp(type: 'verify' | 'login' | 'reset', phoneNumber: string): string | undefined {
    if (process.env.NODE_ENV === 'production') return undefined;
    try {
      if (fs.existsSync(this.storePath)) {
        const data = JSON.parse(fs.readFileSync(this.storePath, 'utf8'));
        return data[`${type.toLowerCase()}:${phoneNumber.trim().toLowerCase()}`];
      }
    } catch {
      return undefined;
    }
    return undefined;
  }
}

/**
 * Production Real SMS Delivery Provider Adapter.
 * Supports configurable HTTP SMS API / Twilio gateway using environment variables.
 */
export class RealSmsDeliveryProvider implements SmsDeliveryProvider {
  private provider: string;
  private apiKey: string;
  private apiSecret: string;
  private fromNumber: string;
  private isConfiguredFlag: boolean = false;

  constructor(options?: {
    provider?: string;
    apiKey?: string;
    apiSecret?: string;
    from?: string;
  }) {
    this.provider = options?.provider || process.env.SMS_PROVIDER || '';
    this.apiKey = options?.apiKey || process.env.SMS_API_KEY || process.env.SMS_ACCOUNT_SID || '';
    this.apiSecret = options?.apiSecret || process.env.SMS_API_SECRET || process.env.SMS_AUTH_TOKEN || '';
    this.fromNumber = options?.from || process.env.SMS_FROM || '';

    if (this.apiKey.trim() !== '' && this.apiSecret.trim() !== '') {
      this.isConfiguredFlag = true;
    } else {
      this.isConfiguredFlag = false;
    }
  }

  public isConfigured(): boolean {
    return this.isConfiguredFlag;
  }

  public async verifyConnection(): Promise<{ success: boolean; error?: string }> {
    if (!this.isConfiguredFlag) {
      return { success: false, error: 'Real SMS provider is not configured (missing API credentials).' };
    }
    // Perform provider connectivity verification
    try {
      if (this.provider.toLowerCase() === 'twilio') {
        const authHeader = 'Basic ' + Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64');
        const url = `https://api.twilio.com/2010-04-01/Accounts/${this.apiKey}.json`;
        const res = await fetch(url, {
          method: 'GET',
          headers: { Authorization: authHeader },
          signal: AbortSignal.timeout(10000)
        });
        if (!res.ok) {
          return { success: false, error: `Twilio returned HTTP ${res.status}` };
        }
      }
      return { success: true };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return { success: false, error: errorMessage };
    }
  }

  private async dispatchSms(phoneNumber: string, message: string): Promise<void> {
    if (!this.isConfiguredFlag) {
      throw new Error('Real SMS provider is not configured.');
    }

    if (this.provider.toLowerCase() === 'twilio') {
      const authHeader = 'Basic ' + Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64');
      const url = `https://api.twilio.com/2010-04-01/Accounts/${this.apiKey}/Messages.json`;
      const params = new URLSearchParams();
      params.append('To', phoneNumber);
      params.append('From', this.fromNumber);
      params.append('Body', message);

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString(),
        signal: AbortSignal.timeout(10000)
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`SMS delivery gateway error (HTTP ${res.status}): ${errBody}`);
      }
    } else {
      // Generic mock/webhook adapter
      logger.info(`[REAL SMS] Dispatched SMS to ${phoneNumber}: ${message}`);
    }
  }

  public async sendVerificationCode(phoneNumber: string, otp: string): Promise<void> {
    const message = `⚡ AuthForge verification code: ${otp}. Valid for 10 minutes. Never share this code with anyone.`;
    await this.dispatchSms(phoneNumber, message);
  }

  public async sendLoginCode(phoneNumber: string, otp: string): Promise<void> {
    const message = `⚡ AuthForge sign-in code: ${otp}. Valid for 10 minutes. Never share this code with anyone.`;
    await this.dispatchSms(phoneNumber, message);
  }

  public async sendPasswordResetCode(phoneNumber: string, otp: string): Promise<void> {
    const message = `🔒 AuthForge password recovery code: ${otp}. Valid for 10 minutes. If you did not request this, ignore.`;
    await this.dispatchSms(phoneNumber, message);
  }
}

import { Msg91SmsDeliveryProvider } from './msg91-sms-delivery.provider.js';

/**
 * Hybrid SMS OTP Delivery Provider.
 * Automatically delegates to Real SMS (MSG91 / Twilio) when configured, and safely records to local dev sandbox in development.
 */
export class HybridSmsDeliveryProvider implements SmsDeliveryProvider {
  private devProvider: DevelopmentSmsDeliveryProvider;
  private realProvider: SmsDeliveryProvider;

  constructor(customReal?: SmsDeliveryProvider, customDev?: DevelopmentSmsDeliveryProvider) {
    this.devProvider = customDev || new DevelopmentSmsDeliveryProvider();

    if (customReal) {
      this.realProvider = customReal;
    } else {
      const selectedProvider = (process.env.SMS_PROVIDER || '').trim().toLowerCase();
      if (selectedProvider === 'msg91') {
        this.realProvider = new Msg91SmsDeliveryProvider();
      } else if (selectedProvider === 'twilio') {
        this.realProvider = new RealSmsDeliveryProvider();
      } else if (selectedProvider === 'development') {
        this.realProvider = this.devProvider;
      } else {
        // Default to RealSmsDeliveryProvider if unspecified
        this.realProvider = new RealSmsDeliveryProvider();
      }
    }
  }

  public getRealProvider(): SmsDeliveryProvider {
    return this.realProvider;
  }

  public getDevProvider(): DevelopmentSmsDeliveryProvider {
    return this.devProvider;
  }

  public isConfigured(): boolean {
    return this.realProvider.isConfigured();
  }

  public async verifyConnection(): Promise<{ success: boolean; error?: string }> {
    if (this.realProvider.isConfigured()) {
      return this.realProvider.verifyConnection();
    }
    return { success: true };
  }


  public async sendVerificationCode(phoneNumber: string, otp: string): Promise<void> {
    const isProduction = process.env.NODE_ENV === 'production';

    if (this.realProvider.isConfigured()) {
      try {
        await this.realProvider.sendVerificationCode(phoneNumber, otp);
        logger.info(`[SMS] Phone verification code successfully delivered via SMS to ${phoneNumber}`);
        return;
      } catch (err: unknown) {
        logger.error(`[SMS] Failed to deliver phone verification SMS to ${phoneNumber}:`, err);
        if (isProduction) {
          throw err;
        }
        logger.warn(`[SMS Fallback] Falling back to Development SMS Sandbox for ${phoneNumber} due to SMS delivery error.`);
        await this.devProvider.sendVerificationCode(phoneNumber, otp);
        return;
      }
    }

    if (isProduction) {
      logger.warn(`[SMS] Real SMS provider is not configured in production. Verification SMS for ${phoneNumber} was not delivered.`);
      throw new Error('SMS delivery service is not configured.');
    }

    // Default development mode sandbox capture when real SMS is unconfigured
    await this.devProvider.sendVerificationCode(phoneNumber, otp);
  }

  public async sendLoginCode(phoneNumber: string, otp: string): Promise<void> {
    const isProduction = process.env.NODE_ENV === 'production';

    if (this.realProvider.isConfigured()) {
      try {
        await this.realProvider.sendLoginCode(phoneNumber, otp);
        logger.info(`[SMS] Phone login OTP successfully delivered via SMS to ${phoneNumber}`);
        return;
      } catch (err: unknown) {
        logger.error(`[SMS] Failed to deliver phone login SMS to ${phoneNumber}:`, err);
        if (isProduction) {
          throw err;
        }
        logger.warn(`[SMS Fallback] Falling back to Development SMS Sandbox for ${phoneNumber} due to SMS delivery error.`);
        await this.devProvider.sendLoginCode(phoneNumber, otp);
        return;
      }
    }

    if (isProduction) {
      logger.warn(`[SMS] Real SMS provider is not configured in production. Login SMS for ${phoneNumber} was not delivered.`);
      throw new Error('SMS delivery service is not configured.');
    }

    // Default development mode sandbox capture when real SMS is unconfigured
    await this.devProvider.sendLoginCode(phoneNumber, otp);
  }

  public async sendPasswordResetCode(phoneNumber: string, otp: string): Promise<void> {
    const isProduction = process.env.NODE_ENV === 'production';

    if (this.realProvider.isConfigured()) {
      try {
        await this.realProvider.sendPasswordResetCode(phoneNumber, otp);
        logger.info(`[SMS] Phone password reset code successfully delivered via SMS to ${phoneNumber}`);
        return;
      } catch (err: unknown) {
        logger.error(`[SMS] Failed to deliver password reset SMS to ${phoneNumber}:`, err);
        if (isProduction) {
          throw err;
        }
        logger.warn(`[SMS Fallback] Falling back to Development SMS Sandbox for ${phoneNumber} due to SMS delivery error.`);
        await this.devProvider.sendPasswordResetCode(phoneNumber, otp);
        return;
      }
    }

    if (isProduction) {
      logger.warn(`[SMS] Real SMS provider is not configured in production. Password reset SMS for ${phoneNumber} was not delivered.`);
      throw new Error('SMS delivery service is not configured.');
    }

    // Default development mode sandbox capture when real SMS is unconfigured
    await this.devProvider.sendPasswordResetCode(phoneNumber, otp);
  }
}

export const defaultSmsDeliveryProvider: SmsDeliveryProvider = new HybridSmsDeliveryProvider();
