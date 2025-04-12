export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export type User = {
  _id: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserTokens = {
  accessToken: string;
  refreshToken: string;
};
