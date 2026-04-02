import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '@/http/global/users/users.service';
import {
  ConfirmAccountDto,
  ConfirmResetPasswordDto,
  CreateUserDto,
  LoginUserDto,
  ResendCodeDto,
  ResetPasswordDto,
} from '@/http/global/users/dto/user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  USER_CONFIRMED_ACCOUNT,
  USER_REGISTERED,
  USER_RESEND_CODE,
  USER_RESET_PASSWORD,
} from '@/constantes/event';
import { UserRegisteredEvent } from '@/events/class/UserRegisteredEvent';
import { CryptoService } from '@/modules/crypto/crypto.service';
import {
  ResendCodeResult,
  UserRegisteredResult,
  UserResetPasswordResult,
  ValidationCode,
} from '@/http/model';
import { ValidationCodeService } from '@/http/global/validation-code/validation-code.service';
import { ResendCodeEvent } from '@/events/class/ResendCodeEvent';
import { UserConfirmedAccountEvent } from '@/events/class/UserConfirmedAccountEvent';
import { UserRepositoryService } from '@/repositories/user-repository/user-repository.service';
import { ValidationCodeRepositoryService } from '@/repositories/validation-code-repository/validation-code-repository.service';
import { UserResetPasswordEvent } from '@/events/class/UserResetPasswordEvent';
import { VALIDATION_CODE_TYPE_ACCOUNT } from '@/constantes/field-value';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private eventEmitter: EventEmitter2,
    private readonly crypto: CryptoService,
    private readonly validationCode: ValidationCodeService,
    private readonly userService: UsersService,
    private readonly userRepository: UserRepositoryService,
    private readonly validationCodeRepository: ValidationCodeRepositoryService,
  ) {}

  async register(userDto: CreateUserDto): Promise<UserRegisteredResult> {
    try {
      const { validationCode, profile, ...user } = await this.usersService.createUser(userDto);
      this.eventEmitter.emit(
        USER_REGISTERED,
        new UserRegisteredEvent({ ...user, profile }, validationCode![0]),
      );
      return {
        user,
        validationCodeToken: await this.crypto.encrypt(validationCode!),
      };
    } catch (error) {
      throw error;
    }
  }

  async resendCode(codeDto: ResendCodeDto): Promise<ResendCodeResult> {
    const validationCode: ValidationCode = await this.crypto.decrypt(codeDto.validationCodeToken);

    const { user, ...code } = await this.validationCode.update(validationCode);

    this.eventEmitter.emit(USER_RESEND_CODE, new ResendCodeEvent(user!, { ...code }));

    return {
      validationCodeToken: await this.crypto.encrypt(code),
    };
  }

  async confirmAccount(code: ConfirmAccountDto): Promise<boolean> {
    const result = await this.validationCode.checkValidationCode(code);

    this.eventEmitter.emit(USER_CONFIRMED_ACCOUNT, new UserConfirmedAccountEvent(result.user!));

    return true;
  }

  async resetPassword(userDto: ResetPasswordDto): Promise<UserResetPasswordResult> {
    const response = {
      validationCodeToken: '',
    };

    const emailUser = await this.userRepository.findByEmail(userDto.email);

    /**
     * only handle if user exist
     * front should handle message if there is no validation code token
     */
    if (emailUser) {
      const { user, ...rest }: ValidationCode = await this.validationCodeRepository.create(
        emailUser,
        VALIDATION_CODE_TYPE_ACCOUNT.resetPassword,
      );
      response.validationCodeToken = await this.crypto.encrypt(rest!);
      this.eventEmitter.emit(USER_RESET_PASSWORD, new UserResetPasswordEvent(user, rest!));
    }

    return response;
  }

  async resetPasswordConfirm(code: ConfirmResetPasswordDto): Promise<UserResetPasswordResult> {
    await this.validationCode.checkValidationCode(code);
    return {
      validationCodeToken: code.validationCodeToken,
    };
  }

  async login(credentials: LoginUserDto) {}
}
