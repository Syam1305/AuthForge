import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

export interface OtpDeliveryProvider {
  sendVerificationCode(email: string, otp: string): Promise<void>;
  sendPasswordResetCode(email: string, otp: string): Promise<void>;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const devStorePath = path.resolve(__dirname, '../../node_modules/.cache/dev_otp_store.json');

/**
 * Development & Test OTP Delivery Provider.
 * Stores OTPs in local cache for test runners and prints high-visibility ASCII console banners.
 */
export class DevelopmentOtpDeliveryProvider implements OtpDeliveryProvider {
  private static storePath = devStorePath;

  private static persistDevOtp(key: string, otp: string): void {
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

  private static printDevBanner(type: 'EMAIL VERIFICATION' | 'PASSWORD RESET', email: string, otp: string): void {
    console.log('\n' + '='.repeat(72));
    console.log(`📨 [DEV OTP DELIVERY] ${type} CODE`);
    console.log('-'.repeat(72));
    console.log(`👤 Recipient : ${email}`);
    console.log(`🔑 OTP Code  : ${otp}`);
    console.log(`⏱️  Expires In: 10 minutes`);
    console.log(`🛡️  Mode      : DEVELOPMENT (Local Sandbox Capture)`);
    console.log('-'.repeat(72));
    console.log(`💡 Tip: Enter this 6-digit code in the LoginLab verification screen.`);
    console.log('='.repeat(72) + '\n');
  }

  public async sendVerificationCode(email: string, otp: string): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
      DevelopmentOtpDeliveryProvider.persistDevOtp(`verify:${email}`, otp);
      DevelopmentOtpDeliveryProvider.printDevBanner('EMAIL VERIFICATION', email, otp);
      logger.info(`[DEV DELIVERY] Verification code dispatched to ${email} (OTP: ${otp})`);
    } else {
      logger.info(`Verification code dispatched to ${email}`);
    }
  }

  public async sendPasswordResetCode(email: string, otp: string): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
      DevelopmentOtpDeliveryProvider.persistDevOtp(`reset:${email}`, otp);
      DevelopmentOtpDeliveryProvider.printDevBanner('PASSWORD RESET', email, otp);
      logger.info(`[DEV DELIVERY] Password reset code dispatched to ${email} (OTP: ${otp})`);
    } else {
      logger.info(`Password reset code dispatched to ${email}`);
    }
  }

  /**
   * Helper for automated test runners and dev inspection to retrieve the test OTP in development mode.
   */
  public static getDevOtp(type: 'verify' | 'reset', email: string): string | undefined {
    if (process.env.NODE_ENV === 'production') return undefined;
    try {
      if (fs.existsSync(this.storePath)) {
        const data = JSON.parse(fs.readFileSync(this.storePath, 'utf8'));
        return data[`${type.toLowerCase()}:${email.trim().toLowerCase()}`];
      }
    } catch {
      return undefined;
    }
    return undefined;
  }
}

/**
 * Real SMTP Email Delivery Provider (Gmail / Custom SMTP server).
 */
export class SmtpOtpDeliveryProvider implements OtpDeliveryProvider {
  private transporter: nodemailer.Transporter | null = null;
  private fromAddress: string;
  private isConfiguredFlag: boolean = false;

  constructor(options?: {
    host?: string;
    port?: number;
    secure?: boolean;
    user?: string;
    pass?: string;
    from?: string;
  }) {
    const host = options?.host !== undefined ? options.host : process.env.SMTP_HOST;
    const port = options?.port !== undefined 
      ? options.port 
      : (process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587);
    const secure = options?.secure !== undefined 
      ? options.secure 
      : (process.env.SMTP_SECURE === 'true' || port === 465);
    const user = options?.user !== undefined ? options.user : process.env.SMTP_USER;
    const pass = options?.pass !== undefined ? options.pass : process.env.SMTP_PASSWORD;
    
    this.fromAddress = options?.from || process.env.SMTP_FROM || (user ? `AuthForge <${user}>` : 'AuthForge <no-reply@authforge.dev>');

    if (host && host.trim() !== '' && user && user.trim() !== '' && pass && pass.trim() !== '') {
      this.isConfiguredFlag = true;
      this.transporter = nodemailer.createTransport({
        host: host.trim(),
        port,
        secure,
        auth: {
          user: user.trim(),
          pass: pass.trim()
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000
      });
    } else {
      this.isConfiguredFlag = false;
      this.transporter = null;
    }
  }

  public isConfigured(): boolean {
    return this.isConfiguredFlag && this.transporter !== null;
  }

  public async verifyConnection(): Promise<{ success: boolean; error?: string }> {
    if (!this.transporter || !this.isConfiguredFlag) {
      return { success: false, error: 'SMTP transporter is not configured (missing host, user, or password).' };
    }
    try {
      await this.transporter.verify();
      return { success: true };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return { success: false, error: errorMessage };
    }
  }

  public async sendVerificationCode(email: string, otp: string): Promise<void> {
    if (!this.transporter) {
      throw new Error('SMTP transporter is not configured.');
    }

    const textContent = [
      '⚡ AuthForge — Email Verification',
      '',
      `Your 6-digit verification code is: ${otp}`,
      '',
      'This code will expire in 10 minutes.',
      '',
      'SECURITY WARNING: Never share this verification code with anyone. AuthForge employees will never ask for your code.',
      '',
      'If you did not request this email verification, you can safely ignore this message.'
    ].join('\n');

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #0f172a; color: #f8fafc; border-radius: 12px; border: 1px solid #1e293b;">
        <div style="margin-bottom: 24px;">
          <span style="font-size: 20px; font-weight: 700; color: #38bdf8; letter-spacing: -0.5px;">⚡ AuthForge</span>
        </div>
        <h2 style="margin: 0 0 12px; color: #ffffff; font-size: 22px; font-weight: 600;">Confirm Your Email Address</h2>
        <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
          Thank you for signing up with AuthForge. Use the 6-digit verification code below to complete your registration:
        </p>
        <div style="background: #1e293b; padding: 20px; border-radius: 8px; text-align: center; margin: 24px 0; border: 1px solid #334155;">
          <div style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #38bdf8; font-family: monospace;">${otp}</div>
          <div style="color: #64748b; font-size: 12px; margin-top: 8px;">Verification Code (6-Digits)</div>
        </div>
        <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 6px; padding: 12px; margin: 20px 0;">
          <p style="color: #fca5a5; font-size: 12px; margin: 0; line-height: 1.5;">
            ⚠️ <strong>Security Notice:</strong> Never share this verification code with anyone. AuthForge employees will never ask for your code.
          </p>
        </div>
        <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">
          ⏱️ This code will expire in <strong>10 minutes</strong>.<br>
          If you did not request this verification, please safely disregard this email.
        </p>
      </div>
    `;

    await this.transporter.sendMail({
      from: this.fromAddress,
      to: email,
      subject: 'AuthForge — Verify Your Email Address',
      text: textContent,
      html: htmlContent
    });
  }

  public async sendPasswordResetCode(email: string, otp: string): Promise<void> {
    if (!this.transporter) {
      throw new Error('SMTP transporter is not configured.');
    }

    const textContent = [
      '🔒 AuthForge — Password Reset',
      '',
      `Your 6-digit password recovery code is: ${otp}`,
      '',
      'This code will expire in 10 minutes.',
      '',
      'SECURITY WARNING: Never share this recovery code with anyone. If you did not request a password reset, please secure your account immediately.',
      '',
      'If you did not make this request, you can safely ignore this email.'
    ].join('\n');

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #0f172a; color: #f8fafc; border-radius: 12px; border: 1px solid #1e293b;">
        <div style="margin-bottom: 24px;">
          <span style="font-size: 20px; font-weight: 700; color: #f43f5e; letter-spacing: -0.5px;">🔒 AuthForge</span>
        </div>
        <h2 style="margin: 0 0 12px; color: #ffffff; font-size: 22px; font-weight: 600;">Reset Your Password</h2>
        <p style="color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
          A password reset was requested for your AuthForge account. Use the 6-digit code below to set a new password:
        </p>
        <div style="background: #1e293b; padding: 20px; border-radius: 8px; text-align: center; margin: 24px 0; border: 1px solid #334155;">
          <div style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #f43f5e; font-family: monospace;">${otp}</div>
          <div style="color: #64748b; font-size: 12px; margin-top: 8px;">Password Recovery Code (6-Digits)</div>
        </div>
        <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 6px; padding: 12px; margin: 20px 0;">
          <p style="color: #fca5a5; font-size: 12px; margin: 0; line-height: 1.5;">
            ⚠️ <strong>Security Notice:</strong> Never share this code with anyone. If you did not request a password reset, please secure your account immediately.
          </p>
        </div>
        <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">
          ⏱️ This code will expire in <strong>10 minutes</strong>.<br>
          If you did not request this reset, you can safely ignore this email.
        </p>
      </div>
    `;

    await this.transporter.sendMail({
      from: this.fromAddress,
      to: email,
      subject: 'AuthForge — Password Reset Code',
      text: textContent,
      html: htmlContent
    });
  }
}

/**
 * Hybrid OTP Delivery Provider.
 * Automatically delegates to SMTP when configured, and safely records to local dev sandbox in development.
 */
export class HybridOtpDeliveryProvider implements OtpDeliveryProvider {
  private devProvider: DevelopmentOtpDeliveryProvider;
  private smtpProvider: SmtpOtpDeliveryProvider;

  constructor(customSmtp?: SmtpOtpDeliveryProvider, customDev?: DevelopmentOtpDeliveryProvider) {
    this.devProvider = customDev || new DevelopmentOtpDeliveryProvider();
    this.smtpProvider = customSmtp || new SmtpOtpDeliveryProvider();
  }

  public getSmtpProvider(): SmtpOtpDeliveryProvider {
    return this.smtpProvider;
  }

  public getDevProvider(): DevelopmentOtpDeliveryProvider {
    return this.devProvider;
  }

  public async sendVerificationCode(email: string, otp: string): Promise<void> {
    const isProduction = process.env.NODE_ENV === 'production';

    if (!isProduction) {
      await this.devProvider.sendVerificationCode(email, otp);
    }

    if (this.smtpProvider.isConfigured()) {
      try {
        await this.smtpProvider.sendVerificationCode(email, otp);
        logger.info(`[SMTP] Verification code successfully delivered via Gmail SMTP to ${email}`);
        return;
      } catch (err: unknown) {
        logger.error(`[SMTP] Failed to deliver verification email via SMTP to ${email}:`, err);
        if (isProduction) {
          throw err;
        }
        logger.warn(`[SMTP Fallback] Falling back to Development OTP Sandbox for ${email} due to SMTP delivery error.`);
        return;
      }
    }

    if (isProduction) {
      logger.warn(`[SMTP] SMTP is not configured in production. Verification code for ${email} was not delivered.`);
      throw new Error('Email delivery service is not configured.');
    }
  }

  public async sendPasswordResetCode(email: string, otp: string): Promise<void> {
    const isProduction = process.env.NODE_ENV === 'production';

    if (!isProduction) {
      await this.devProvider.sendPasswordResetCode(email, otp);
    }

    if (this.smtpProvider.isConfigured()) {
      try {
        await this.smtpProvider.sendPasswordResetCode(email, otp);
        logger.info(`[SMTP] Password reset code successfully delivered via Gmail SMTP to ${email}`);
        return;
      } catch (err: unknown) {
        logger.error(`[SMTP] Failed to deliver password reset email via SMTP to ${email}:`, err);
        if (isProduction) {
          throw err;
        }
        logger.warn(`[SMTP Fallback] Falling back to Development OTP Sandbox for ${email} due to SMTP delivery error.`);
        return;
      }
    }

    if (isProduction) {
      logger.warn(`[SMTP] SMTP is not configured in production. Password reset code for ${email} was not delivered.`);
      throw new Error('Email delivery service is not configured.');
    }
  }
}

export const defaultOtpDeliveryProvider: OtpDeliveryProvider = new HybridOtpDeliveryProvider();
