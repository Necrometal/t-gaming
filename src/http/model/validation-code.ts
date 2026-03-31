import { User, UserRegisteredResult } from '@/http/model';

export type ValidationCode = {
  id: number;
  userId?: number;
  user?: User;
  code: string;
  createdAt?: string;
  updatedAt?: string;
  expiredAt?: string;
};

export type ResendCodeResult = Omit<UserRegisteredResult, 'user'>;
