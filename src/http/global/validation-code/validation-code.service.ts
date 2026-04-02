import { CODE_DURATION } from '@/constantes/global';
import { dateAfter } from '@/helpers/helpers.date';
import { generateNumber } from '@/helpers/helpers.number';
import { ValidationCode } from '@/http/model';
import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { env } from 'prisma/config';
import { UserDataSimple, ProfileDataSimple, ValidationDataSimple } from '@/http/global/fragments';

@Injectable()
export class ValidationCodeService {
  constructor(private readonly prisma: PrismaService) {}

  async update(validation: ValidationCode): Promise<ValidationCode> {
    const result = await this.prisma.validationCode.update({
      where: {
        id: validation.id,
      },
      data: {
        code: generateNumber(6, true) as string,
        expiredAt: dateAfter(new Date(), parseInt(env(CODE_DURATION))),
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

    return result;
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
    });

    return result;
  }

  async use(validation: ValidationCode) {
    await this.prisma.validationCode.update({
      where: { id: validation.id },
      data: {
        used: true,
      },
    });
  }
}
