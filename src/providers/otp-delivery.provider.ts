import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export interface OtpDeliveryProvider {
  sendVerificationCode(email: string, otp: string): Promise<void>;
  sendPasswordResetCode(email: string, otp: string): Promise<void>;
}

export class DevelopmentOtpDeliveryProvider implements OtpDeliveryProvider {
  private static storePath = path.resolve(process.cwd(), 'node_modules', '.cache', 'dev_otp_store.json');

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
      currentData[key] = otp;
      fs.writeFileSync(this.storePath, JSON.stringify(currentData, null, 2), 'utf8');
    } catch (e) {
      // Ignored for testing helper
    }
  }

  public async sendVerificationCode(email: string, otp: string): Promise<void> {
    if (env.NODE_ENV !== 'production') {
      DevelopmentOtpDeliveryProvider.persistDevOtp(`verify:${email}`, otp);
      logger.info(`[DEV DELIVERY] Verification code dispatched to ${email} (OTP: ${otp})`);
    } else {
      logger.info(`Verification code dispatched to ${email}`);
    }
  }

  public async sendPasswordResetCode(email: string, otp: string): Promise<void> {
    if (env.NODE_ENV !== 'production') {
      DevelopmentOtpDeliveryProvider.persistDevOtp(`reset:${email}`, otp);
      logger.info(`[DEV DELIVERY] Password reset code dispatched to ${email} (OTP: ${otp})`);
    } else {
      logger.info(`Password reset code dispatched to ${email}`);
    }
  }

  /**
   * Helper for automated test runners to retrieve the test OTP in development mode.
   */
  public static getDevOtp(type: 'verify' | 'reset', email: string): string | undefined {
    if (env.NODE_ENV === 'production') return undefined;
    try {
      if (fs.existsSync(this.storePath)) {
        const data = JSON.parse(fs.readFileSync(this.storePath, 'utf8'));
        return data[`${type}:${email}`];
      }
    } catch {
      return undefined;
    }
    return undefined;
  }
}

export const defaultOtpDeliveryProvider: OtpDeliveryProvider = new DevelopmentOtpDeliveryProvider();
