import { User, UserRegisteredResult } from '@/http/model';

export type ValidationCode = {
  id: number;
  userId?: number;
  user?: User | null;
  code?: string;
  createdAt?: string;
  updatedAt?: string;
  expiredAt?: string;
  used?: boolean;
};

export type ResendCodeResult = Omit<UserRegisteredResult, 'user'>;
