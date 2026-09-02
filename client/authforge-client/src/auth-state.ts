import { User, AuthTokens } from './types.js';

export type AuthState = 'loading' | 'authenticated' | 'unauthenticated';

export type AuthStateListener = (state: AuthState, user: User | null) => void;

export class AuthStateManager {
  private state: AuthState = 'loading';
  private user: User | null = null;
  private listeners: Set<AuthStateListener> = new Set();

  public getState(): AuthState {
    return this.state;
  }

  public getUser(): User | null {
    return this.user ? { ...this.user } : null;
  }

  public isAuthenticated(): boolean {
    return this.state === 'authenticated';
  }

  public setLoading(): void {
    this.state = 'loading';
    this.notify();
  }

  public setAuthenticated(user: User): void {
    this.state = 'authenticated';
    this.user = { ...user };
    this.notify();
  }

  public setUnauthenticated(): void {
    this.state = 'unauthenticated';
    this.user = null;
    this.notify();
  }

  public subscribe(listener: AuthStateListener): () => void {
    this.listeners.add(listener);
    // Trigger immediate notification of current state
    listener(this.state, this.user);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    for (const listener of this.listeners) {
      try {
        listener(this.state, this.user);
      } catch (err) {
        console.error('Error in AuthState listener:', err);
      }
    }
  }
}
