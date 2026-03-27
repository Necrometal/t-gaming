import { CreateRoleDto } from '@/http/global/roles/dto/role.dto';

export const ROLES_PRINCIPAL: CreateRoleDto[] = [
  {
    name: 'User', // customer who create the tournament and participate to tournament
    tag: 'user',
  },
];
