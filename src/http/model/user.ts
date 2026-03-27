import { Role } from '@/http/model';

export type User = {
  id: number;
  email: string;
  password?: string;
  roleId?: number;
  role?: Role;
};
