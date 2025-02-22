export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export type UserTokens = {
  accessToken: string;
  refreshToken: string;
};
