import { CreateRoleDto } from '@/admin/roles/entities/role.entity';

export const ROLES_PRINCIPAL: CreateRoleDto[] = [
  {
    name: 'User', // customer who create the tournament and participate to tournament
    tag: 'user',
  },
];
