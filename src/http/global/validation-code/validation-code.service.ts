import { CODE_DURATION } from '@/constantes/global';
import { dateAfter } from '@/helpers/helpers.date';
import { generateNumber } from '@/helpers/helpers.number';
import { ValidationCode } from '@/http/model';
import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { env } from 'prisma/config';
import { UserDataSimple, ProfileDataSimple, ValidationDataSimple } from '@/http/global/fragments';
import { ValidationCodeRepositoryService } from '@/repositories/validation-code-repository/validation-code-repository.service';

@Injectable()
export class ValidationCodeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validationCodeRepository: ValidationCodeRepositoryService,
  ) {}

  async update(validation: ValidationCode): Promise<ValidationCode> {
    const result = await this.validationCodeRepository.update(validation);
    return result;
  }

  async check(validation: ValidationCode): Promise<ValidationCode | null> {
    const result: ValidationCode | null = await this.validationCodeRepository.check(validation);
    return result;
  }

  async use(validation: ValidationCode) {
    await this.validationCodeRepository.use(validation);
  }
}
