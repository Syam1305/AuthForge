import { SmsDeliveryProvider } from './sms-delivery.provider.js';
import { PhoneUtil } from '../utils/phone.js';
import { logger } from '../utils/logger.js';

export interface Msg91DeliveryOptions {
  authKey?: string;
  templateId?: string;
  verifyTemplateId?: string;
  loginTemplateId?: string;
  resetTemplateId?: string;
  timeoutMs?: number;
}

/**
 * Production-Quality MSG91 SMS OTP Delivery Provider Adapter.
 * Dispatches AuthForge-generated OTP codes through MSG91 SendOTP API v5.
 * 
 * NOTE: AuthForge retains 100% ownership of OTP generation, hashing, expiration,
 * attempt counting, resend cooldown, rate limiting, and verification.
 * MSG91 functions strictly as an outbound SMS delivery pipe.
 */
export class Msg91SmsDeliveryProvider implements SmsDeliveryProvider {
  private authKey: string;
  private templateId: string;
  private verifyTemplateId: string;
  private loginTemplateId: string;
  private resetTemplateId: string;
  private timeoutMs: number;
  private isConfiguredFlag: boolean = false;

  private static readonly API_ENDPOINT = 'https://control.msg91.com/api/v5/otp';

  constructor(options?: Msg91DeliveryOptions) {
    this.authKey = (options?.authKey || process.env.MSG91_AUTH_KEY || '').trim();
    this.templateId = (options?.templateId || process.env.MSG91_TEMPLATE_ID || '').trim();
    this.verifyTemplateId = (options?.verifyTemplateId || process.env.MSG91_VERIFY_TEMPLATE_ID || '').trim();
    this.loginTemplateId = (options?.loginTemplateId || process.env.MSG91_LOGIN_TEMPLATE_ID || '').trim();
    this.resetTemplateId = (options?.resetTemplateId || process.env.MSG91_RESET_TEMPLATE_ID || '').trim();
    this.timeoutMs = options?.timeoutMs || 10000;

    if (this.authKey !== '' && this.templateId !== '') {
      this.isConfiguredFlag = true;
    } else {
      this.isConfiguredFlag = false;
    }
  }

  public isConfigured(): boolean {
    return this.isConfiguredFlag;
  }

  /**
   * Validates configuration and connectivity readiness without sending a real SMS.
   */
  public async verifyConnection(): Promise<{ success: boolean; error?: string }> {
    if (!this.isConfiguredFlag) {
      return {
        success: false,
        error: 'MSG91 provider is not configured (missing MSG91_AUTH_KEY or MSG91_TEMPLATE_ID).'
      };
    }

    return { success: true };
  }

  /**
   * Resolves the appropriate MSG91 template ID based on purpose.
   */
  private resolveTemplateId(purpose: 'verify' | 'login' | 'reset'): string {
    switch (purpose) {
      case 'verify':
        return this.verifyTemplateId || this.templateId;
      case 'login':
        return this.loginTemplateId || this.templateId;
      case 'reset':
        return this.resetTemplateId || this.templateId;
      default:
        return this.templateId;
    }
  }

  /**
   * Formats a phone number for MSG91 transport representation.
   * Canonical AuthForge format: +919876543210
   * MSG91 transport format: 919876543210 (country code + national number without leading '+')
   */
  public static formatMobileForTransport(phoneNumber: string): string {
    const normalized = PhoneUtil.normalize(phoneNumber);
    return normalized.replace(/^\+/, '');
  }

  /**
   * Masks a phone number for sanitized logging (e.g. +91******3210).
   */
  private static maskPhone(phoneNumber: string): string {
    const cleaned = phoneNumber.trim();
    if (cleaned.length <= 6) return '***';
    const prefix = cleaned.slice(0, 3);
    const suffix = cleaned.slice(-4);
    return `${prefix}${'*'.repeat(Math.max(0, cleaned.length - 7))}${suffix}`;
  }

  /**
   * Core dispatch mechanism sending the AuthForge-generated OTP through MSG91 SendOTP API.
   */
  private async dispatchOtp(
    phoneNumber: string,
    otp: string,
    purpose: 'verify' | 'login' | 'reset'
  ): Promise<void> {
    if (!this.isConfiguredFlag) {
      throw new Error('MSG91 SMS provider is not configured.');
    }

    const templateId = this.resolveTemplateId(purpose);
    if (!templateId) {
      throw new Error(`MSG91 template ID for purpose '${purpose}' is not configured.`);
    }

    const mobile = Msg91SmsDeliveryProvider.formatMobileForTransport(phoneNumber);
    const maskedPhone = Msg91SmsDeliveryProvider.maskPhone(phoneNumber);

    const queryParams = new URLSearchParams({
      template_id: templateId,
      mobile: mobile,
      otp: otp,
      otp_expiry: '10',
      realTimeResponse: '1'
    });

    const url = `${Msg91SmsDeliveryProvider.API_ENDPOINT}?${queryParams.toString()}`;

    const requestBody = JSON.stringify({
      otp: otp,
      OTP: otp
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          authkey: this.authKey,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: requestBody,
        signal: AbortSignal.timeout(this.timeoutMs)
      });

      const responseText = await response.text();
      let responseData: any = null;

      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = null;
      }

      if (!response.ok) {
        const errorDetail = responseData?.message || `HTTP status ${response.status}`;
        logger.error(`[MSG91] SMS delivery failed for ${maskedPhone} [${purpose}]: ${errorDetail}`);
        throw new Error(`MSG91 SMS delivery gateway error: ${errorDetail}`);
      }

      if (responseData && responseData.type === 'error') {
        const errorDetail = responseData.message || 'Unknown provider rejection';
        logger.error(`[MSG91] SMS delivery rejected for ${maskedPhone} [${purpose}]: ${errorDetail}`);
        throw new Error(`MSG91 SMS delivery rejected: ${errorDetail}`);
      }

      logger.info(`[MSG91] SMS OTP successfully dispatched for ${maskedPhone} [${purpose}]`);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'TimeoutError') {
        logger.error(`[MSG91] Request timed out while dispatching SMS to ${maskedPhone} [${purpose}]`);
        throw new Error('MSG91 SMS delivery request timed out.');
      }
      throw err;
    }
  }

  public async sendVerificationCode(phoneNumber: string, otp: string): Promise<void> {
    await this.dispatchOtp(phoneNumber, otp, 'verify');
  }

  public async sendLoginCode(phoneNumber: string, otp: string): Promise<void> {
    await this.dispatchOtp(phoneNumber, otp, 'login');
  }

  public async sendPasswordResetCode(phoneNumber: string, otp: string): Promise<void> {
    await this.dispatchOtp(phoneNumber, otp, 'reset');
  }
}
