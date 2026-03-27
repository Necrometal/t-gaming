import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { HelpersService } from '@/helpers/helpers.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(user: CreateUserDto) {
    const result = await this.prisma.user.create({
      data: {
        email: user.email,
        password: await HelpersService.hash(user.password),
        role: {
          connect: {
            id: user.roleId,
          },
        },
      },
    });

    return result;
  }
}
