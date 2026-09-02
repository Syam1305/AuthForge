import { AuthTokens } from './types.js';

export interface TokenStorage {
  getTokens(): Promise<AuthTokens | null> | AuthTokens | null;
  saveTokens(tokens: AuthTokens): Promise<void> | void;
  clearTokens(): Promise<void> | void;
}

/**
 * In-memory token storage (Default).
 * Ephemeral, clean, and isolated from browser/disk vulnerabilities.
 */
export class InMemoryTokenStorage implements TokenStorage {
  private tokens: AuthTokens | null = null;

  public getTokens(): AuthTokens | null {
    return this.tokens ? { ...this.tokens } : null;
  }

  public saveTokens(tokens: AuthTokens): void {
    this.tokens = { ...tokens };
  }

  public clearTokens(): void {
    this.tokens = null;
  }
}

/**
 * Web LocalStorage / SessionStorage Adapter.
 * Atomically serializes token pairs under a single key.
 */
export class WebStorageAdapter implements TokenStorage {
  private storageKey: string;
  private storage: Storage;

  constructor(storageKey = 'authforge_tokens', useSessionStorage = false) {
    this.storageKey = storageKey;
    if (typeof window !== 'undefined') {
      this.storage = useSessionStorage ? window.sessionStorage : window.localStorage;
    } else {
      // Fallback for non-browser environments
      this.storage = {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        key: () => null,
        length: 0
      } as Storage;
    }
  }

  public getTokens(): AuthTokens | null {
    try {
      const raw = this.storage.getItem(this.storageKey);
      if (!raw) return null;
      return JSON.parse(raw) as AuthTokens;
    } catch {
      return null;
    }
  }

  public saveTokens(tokens: AuthTokens): void {
    try {
      this.storage.setItem(this.storageKey, JSON.stringify(tokens));
    } catch (e) {
      console.error('Failed to save tokens to web storage:', e);
    }
  }

  public clearTokens(): void {
    try {
      this.storage.removeItem(this.storageKey);
    } catch (e) {
      console.error('Failed to clear tokens from web storage:', e);
    }
  }
}
