import { CODE_DURATION } from '@/constantes/global';
import { dateAfter } from '@/helpers/helpers.date';
import { generateNumber } from '@/helpers/helpers.number';
import { ProfileDataSimple, UserDataSimple, ValidationDataSimple } from '@/http/global/fragments';
import { CreateUserDto } from '@/http/global/users/dto/user.dto';
import { User } from '@/http/model';
import { CryptoService } from '@/modules/crypto/crypto.service';
import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { env } from 'prisma/config';

@Injectable()
export class UserRepositoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly crypto: CryptoService,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
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
  }
}
