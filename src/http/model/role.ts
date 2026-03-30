import { User } from '@/http/model';

export class Role {
  id: number;
  name: string;
  tag: string;
  users?: User[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
