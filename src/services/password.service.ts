import argon2 from 'argon2';
import { logger } from '../utils/logger.js';

// Pre-computed dummy hash used to equalize execution time during invalid login attempts
// (prevents user enumeration via timing side-channels)
const DUMMY_HASH = '$argon2id$v=19$m=65536,t=3,p=4$qH/9m1bY46RkgN8k9c8k1Q$bFkYqY41xMvY3y+j9yN32a1q3n8+y0b6j4w7a8';

export class PasswordService {
  /**
   * Hashes a plaintext password using Argon2id.
   */
  public static async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536, // 64 MB
      timeCost: 3,
      parallelism: 4
    });
  }

  /**
   * Verifies a plaintext password against an Argon2id hash.
   */
  public static async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, password);
    } catch (error) {
      logger.error('Error during password verification:', error);
      return false;
    }
  }

  /**
   * Performs a dummy password verification computation to maintain constant-time
   * response behavior when an email is not found in the database.
   */
  public static async verifyDummy(password: string): Promise<void> {
    try {
      await argon2.verify(DUMMY_HASH, password);
    } catch {
      // Ignored intentionally for timing equalization
    }
  }
}
