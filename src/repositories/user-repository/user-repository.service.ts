import { VALIDATION_CODE_TYPE_ACCOUNT } from '@/constantes/field-value';
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
            type: VALIDATION_CODE_TYPE_ACCOUNT.register,
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
          where: {
            type: VALIDATION_CODE_TYPE_ACCOUNT.register,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
        profile: {
          select: ProfileDataSimple,
        },
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        ...UserDataSimple,
        validateAt: true,
      },
    });
  }

  async confirmAccount(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { validateAt: new Date() },
    });
  }

  /**
   *
   * @param id User id
   * @param password New password
   * @returns
   */
  async changePassword(id: number, password: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        password: await this.crypto.hash(password),
        updatedAt: new Date(),
      },
    });
  }
}
