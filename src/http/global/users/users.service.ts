import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import type { User } from '@/http/model';
import { env } from 'prisma/config';
import { CODE_DURATION } from '@/constantes/global';
import { generateNumber } from '@/helpers/helpers.number';
import { CryptoService } from '@/modules/crypto/crypto.service';
import { dateAfter } from '@/helpers/helpers.date';
import { ProfileDataSimple, UserDataSimple, ValidationDataSimple } from '@/http/global/fragments';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly crypto: CryptoService,
  ) {}
  async createUser(user: CreateUserDto) {
    const result: User = await this.prisma.user.create({
      data: {
        email: user.email,
        password: await this.crypto.hash(user.password),
        role: {
          connect: {
            id: user.roleId,
          },
        },
        validationCode: {
          create: {
            expiredAt: dateAfter(new Date(), parseInt(env(CODE_DURATION))),
            code: generateNumber(6, true) as string,
          },
        },
        profile: {
          create: {
            name: user.name,
            lastname: user.lastname,
          },
        },
      },
      select: {
        ...UserDataSimple,
        validationCode: {
          select: ValidationDataSimple,
        },
        profile: {
          select: ProfileDataSimple,
        },
      },
    });

    return result;
  }

  async confirmAccount(id: number) {}
}
