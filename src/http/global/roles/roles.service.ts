import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async findRoleByTag(tag: string) {
    return await this.prisma.role.findFirst({
      where: {
        tag,
      },
    });
  }
}
