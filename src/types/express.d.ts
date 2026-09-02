export interface AuthenticatedContext {
  userId: string;
  sessionId: string;
  tokenId: string;
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthenticatedContext;
    }
  }
}
