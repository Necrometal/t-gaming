import { CODE_DURATION } from '@/constantes/global';
import { dateAfter } from '@/helpers/helpers.date';
import { generateNumber } from '@/helpers/helpers.number';
import { ValidationCode } from '@/http/model';
import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { env } from 'prisma/config';
import { ValidationDataSimple } from '@/http/global/fragments/validation';
import { UserDataSimple } from '@/http/global/fragments/user';

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
          select: UserDataSimple,
        },
      },
    });

    return result;
  }
}
