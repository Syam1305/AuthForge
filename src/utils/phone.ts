import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
import { ValidationError } from '../errors/app.error.js';

export class PhoneUtil {
  public static readonly DEFAULT_REGION: CountryCode = 'IN';

  /**
   * Validates whether a raw phone number string is valid for a given country or in E.164 format.
   */
  public static isValid(rawPhone: string, defaultCountry: CountryCode = this.DEFAULT_REGION): boolean {
    if (!rawPhone || typeof rawPhone !== 'string') {
      return false;
    }

    const trimmed = rawPhone.trim();
    if (trimmed.length < 5) {
      return false;
    }

    try {
      const parsed = parsePhoneNumberFromString(trimmed, defaultCountry);
      return Boolean(parsed && parsed.isValid());
    } catch {
      return false;
    }
  }

  /**
   * Normalizes a raw phone number into canonical E.164 format (e.g. "+919876543210", "+14155552671").
   * Throws ValidationError if the phone number cannot be parsed or is invalid.
   */
  public static normalize(rawPhone: string, defaultCountry: CountryCode = this.DEFAULT_REGION): string {
    if (!rawPhone || typeof rawPhone !== 'string') {
      throw new ValidationError('Phone number is required and must be a non-empty string.');
    }

    const trimmed = rawPhone.trim();
    const parsed = parsePhoneNumberFromString(trimmed, defaultCountry);

    if (!parsed || !parsed.isValid()) {
      throw new ValidationError(
        `Invalid phone number format: "${rawPhone}". Please provide a valid phone number with country code (e.g. +919876543210).`
      );
    }

    return parsed.format('E.164');
  }
}
