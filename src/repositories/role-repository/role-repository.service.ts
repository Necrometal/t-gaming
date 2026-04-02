import { RoleDataSimple } from '@/http/global/fragments';
import { Role } from '@/http/model';
import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findRoleByTag(tag: string): Promise<Role | null> {
    return this.prisma.role.findFirst({
      where: {
        tag,
      },
      select: {
        ...RoleDataSimple,
      },
    });
  }
}
