import { ValidationCode } from '@/http/model';
import { PrismaService } from '@/prisma.service';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { ValidationCodeRepositoryService } from '@/repositories/validation-code-repository/validation-code-repository.service';
import { UsersService } from '@/http/global/users/users.service';
import { ConfirmResetPasswordDto } from '@/http/global/users/dto/user.dto';
import { CryptoService } from '@/modules/crypto/crypto.service';

@Injectable()
export class ValidationCodeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validationCodeRepository: ValidationCodeRepositoryService,
    private readonly userService: UsersService,
    private readonly crypto: CryptoService,
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

  async checkValidationCode(code: ConfirmResetPasswordDto) {
    const validationCode: ValidationCode = await this.crypto.decrypt(code.validationCodeToken);
    // check if code expired
    const result: ValidationCode | null = await this.check(validationCode);
    if (result && !result.used) {
      await this.use(result);
      await this.userService.confirmAccount(result.user!.id);
    } else if (result && result.used) {
      throw new ConflictException('Code already used');
    } else {
      throw new BadRequestException('Invalid or expired code');
    }

    return result;
  }

  async getValidationCodeByToken(token: string): Promise<ValidationCode> {
    const validationCode: ValidationCode = await this.crypto.decrypt(token);
    const result = await this.validationCodeRepository.getValidationCodeById(validationCode.id);
    if (!result) {
      throw new BadRequestException('Invalid validation code token');
    }

    return result;
  }
}
