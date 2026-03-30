import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserDataSimple } from '@/http/global/fragments/user';
import type { User } from '@/http/model';
import { env } from 'prisma/config';
import { addMinute } from '@formkit/tempo';
import { CODE_DURATION } from '@/constantes/global';
import { hash } from '@/helpers/helpers.text';
import { generateNumber } from '@/helpers/helpers.number';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(user: CreateUserDto) {
    const result: User = await this.prisma.user.create({
      data: {
        email: user.email,
        password: await hash(user.password),
        role: {
          connect: {
            id: user.roleId,
          },
        },
        validation: {
          create: {
            expiredAt: addMinute(new Date(), parseInt(env(CODE_DURATION))),
            code: generateNumber(6, true) as string,
          },
        },
      },
      select: UserDataSimple,
    });
    return result;
  }
}
