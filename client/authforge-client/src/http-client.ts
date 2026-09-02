import { ApiResponse } from './types.js';
import { parseApiError, NetworkError, AuthForgeError } from './errors.js';

export interface HttpRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  token?: string | null;
  timeoutMs?: number;
}

export class HttpClient {
  private baseUrl: string;
  private defaultTimeoutMs: number;

  constructor(baseUrl: string, defaultTimeoutMs = 15000) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    this.defaultTimeoutMs = defaultTimeoutMs;
  }

  public async request<T>(path: string, options: HttpRequestOptions = {}): Promise<T> {
    const url = `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
    const method = options.method || 'GET';
    const timeoutMs = options.timeoutMs || this.defaultTimeoutMs;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers || {})
    };

    if (options.token) {
      headers['Authorization'] = `Bearer ${options.token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      let payload: ApiResponse<T> | null = null;
      try {
        payload = (await response.json()) as ApiResponse<T>;
      } catch {
        // Non-JSON response
      }

      if (!response.ok) {
        throw parseApiError(response.status, payload?.error);
      }

      if (payload && payload.success === false) {
        throw parseApiError(response.status, payload.error);
      }

      return (payload?.data ?? payload) as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof AuthForgeError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new NetworkError(`Request timed out after ${timeoutMs}ms`);
      }

      if (error instanceof Error) {
        throw new NetworkError(`Network connection error: ${error.message}`);
      }

      throw error;
    }
  }
}
