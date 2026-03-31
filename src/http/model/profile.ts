import { User } from '@/http/model';

export type Profile = {
  id: number;
  name?: string;
  lastName?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  userId?: number;
  user?: User;
};
