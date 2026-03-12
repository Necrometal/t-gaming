import { Injectable } from '@nestjs/common';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleCreateInput } from '@/prisma/models/Role';
import { Role } from '@/prisma/client';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  create(data: RoleCreateInput): Promise<Role> {
    return this.prisma.role.create({ data });
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
