import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserDataSimple } from '@/http/global/fragments/user';
import type { User } from '@/http/model';
import { env } from 'prisma/config';
import { CODE_DURATION } from '@/constantes/global';
import { generateNumber } from '@/helpers/helpers.number';
import { ValidationDataSimple } from '@/http/global/fragments/validation';
import { CryptoService } from '@/modules/crypto/crypto.service';
import { dateAfter } from '@/helpers/helpers.date';

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
      },
      select: {
        ...UserDataSimple,
        validationCode: {
          select: ValidationDataSimple,
        },
      },
    });

    return result;
  }
}
