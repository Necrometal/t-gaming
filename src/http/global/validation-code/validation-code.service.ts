import { ValidationCode } from '@/http/model';
import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { ValidationCodeRepositoryService } from '@/repositories/validation-code-repository/validation-code-repository.service';

@Injectable()
export class ValidationCodeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validationCodeRepository: ValidationCodeRepositoryService,
  ) {}

  async update(validation: ValidationCode): Promise<ValidationCode> {
    const result = await this.validationCodeRepository.updateWithReturnUser(validation);
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
