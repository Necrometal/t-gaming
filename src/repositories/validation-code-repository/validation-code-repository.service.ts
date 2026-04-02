import { VALIDATION_CODE_TYPE_ACCOUNT, ValidationCodeType } from '@/constantes/field-value';
import { CODE_DURATION } from '@/constantes/global';
import { dateAfter } from '@/helpers/helpers.date';
import { generateNumber } from '@/helpers/helpers.number';
import { ProfileDataSimple, UserDataSimple, ValidationDataSimple } from '@/http/global/fragments';
import { User, ValidationCode } from '@/http/model';
import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { env } from 'prisma/config';

@Injectable()
export class ValidationCodeRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, type: ValidationCodeType = VALIDATION_CODE_TYPE_ACCOUNT.register) {
    return this.prisma.validationCode.create({
      data: {
        expiredAt: dateAfter(new Date(), parseInt(env(CODE_DURATION))),
        code: generateNumber(6, true) as string,
        type,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      select: {
        ...ValidationDataSimple,
        user: {
          select: {
            ...UserDataSimple,
            profile: {
              select: ProfileDataSimple,
            },
          },
        },
      },
    });
  }

  async updateWithReturnUser(validation: ValidationCode): Promise<ValidationCode> {
    return this.prisma.validationCode.update({
      where: {
        id: validation.id,
      },
      data: {
        code: generateNumber(6, true) as string,
        expiredAt: dateAfter(new Date(), parseInt(env(CODE_DURATION))),
        updatedAt: new Date(),
      },
      select: {
        ...ValidationDataSimple,
        user: {
          select: {
            ...UserDataSimple,
            profile: {
              select: ProfileDataSimple,
            },
          },
        },
      },
    });
  }

  async check(validation: ValidationCode): Promise<ValidationCode | null> {
    const result: ValidationCode | null = await this.prisma.validationCode.findFirst({
      where: {
        AND: [
          {
            expiredAt: {
              gt: new Date(),
            },
          },
          {
            id: validation.id,
            code: validation.code,
          },
        ],
      },
      select: {
        id: true,
        used: true,
        user: {
          select: {
            ...UserDataSimple,
            profile: {
              select: ProfileDataSimple,
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return result;
  }

  async use(validation: ValidationCode): Promise<unknown> {
    return this.prisma.validationCode.update({
      where: { id: validation.id },
      data: {
        used: true,
        updatedAt: new Date(),
      },
    });
  }

  async getValidationCodeById(id: number) {
    return this.prisma.validationCode.findUnique({
      where: { id },
      select: {
        id: true,
        user: {
          select: {
            ...UserDataSimple,
            profile: {
              select: ProfileDataSimple,
            },
          },
        },
      },
    });
  }
}
