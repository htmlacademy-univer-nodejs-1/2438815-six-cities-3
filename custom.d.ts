import { TokenPayload } from './src/shared/types/token-payload.js';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TokenPayload;
  }
}
