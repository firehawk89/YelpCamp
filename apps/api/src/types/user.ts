import { Request } from 'express';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export type UserTokens = {
  accessToken: string;
  refreshToken: string;
};

export interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

export type RequestWithUser = Request & { user?: JwtPayload };
