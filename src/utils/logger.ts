// Structured Logger for AuthForge

type LogLevel = 'INFO' | 'WARN' | 'ERROR';

interface LogContext {
  requestId?: string;
  [key: string]: unknown;
}

const SENSITIVE_KEYS = new Set([
  'password',
  'pass',
  'pwd',
  'token',
  'accesstoken',
  'refreshtoken',
  'secret',
  'jwt_secret',
  'otp',
  'code',
  'database_url',
  'authorization',
  'cookie'
]);

function sanitizeData(data: unknown): unknown {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === 'string') {
    // Mask potential postgres connection strings containing passwords
    return data.replace(/postgresql:\/\/[^:]+:([^@]+)@/gi, 'postgresql://***:***@');
  }

  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }

  if (typeof data === 'object') {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      if (SENSITIVE_KEYS.has(key.toLowerCase())) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = sanitizeData(value);
      }
    }
    return sanitized;
  }

  return data;
}

function formatLog(level: LogLevel, message: string, context?: LogContext): string {
  const timestamp = new Date().toISOString();
  const reqIdPart = context?.requestId ? ` [ReqID: ${context.requestId}]` : '';
  const sanitizedMsg = String(sanitizeData(message));
  
  let extra = '';
  if (context) {
    const { requestId, ...rest } = context;
    if (Object.keys(rest).length > 0) {
      const sanitizedRest = sanitizeData(rest);
      extra = ` ${JSON.stringify(sanitizedRest)}`;
    }
  }

  return `[${timestamp}] [${level}]${reqIdPart} ${sanitizedMsg}${extra}`;
}

export const logger = {
  info(message: string, context?: LogContext): void {
    console.log(formatLog('INFO', message, context));
  },
  warn(message: string, context?: LogContext): void {
    console.warn(formatLog('WARN', message, context));
  },
  error(message: string, error?: unknown, context?: LogContext): void {
    const errorDetails = error instanceof Error 
      ? { errorMessage: error.message, errorName: error.name }
      : error;
    
    const fullContext: LogContext = {
      ...(context || {}),
      ...(errorDetails ? { error: errorDetails } : {})
    };

    console.error(formatLog('ERROR', message, fullContext));
  }
};
