import { Role, ValidationCode, Profile } from '@/http/model';

export type User = {
  id: number;
  email: string;
  password?: string;
  roleId?: number;
  role?: Role;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  validationCode?: ValidationCode | null;
  profile?: Profile | null;
};

export type UserRegisteredResult = {
  user: User;
  validationCodeToken: string;
};
