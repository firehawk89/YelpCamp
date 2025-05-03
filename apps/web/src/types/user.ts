import { UserRole } from '@repo/types';

export type User = {
  _id: string;
  email: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  avatar: string | null;
  favoriteCampgrounds: string[];
  createdAt: string;
  updatedAt: string;
};
