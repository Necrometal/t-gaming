import { Injectable } from '@nestjs/common';
import { UsersService } from '@/http/global/users/users.service';
import { CreateUserDto, LoginUserDto, ResendCodeDto } from '@/http/global/users/dto/user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { USER_REGISTERED, USER_RESEND_CODE } from '@/constantes/event';
import { UserRegisteredEvent } from '@/events/class/UserRegisteredEvent';
import { CryptoService } from '@/modules/crypto/crypto.service';
import { ResendCodeResult, UserRegisteredResult } from '@/http/model';
import { ValidationCodeService } from '@/http/global/validation-code/validation-code.service';
import { ResendCodeEvent } from '@/events/class/ResendCodeEvent';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private eventEmitter: EventEmitter2,
    private readonly crypto: CryptoService,
    private readonly validationCode: ValidationCodeService,
  ) {}

  async register(user: CreateUserDto): Promise<UserRegisteredResult> {
    try {
      const { validationCode, ...rest } = await this.usersService.createUser(user);
      this.eventEmitter.emit(
        USER_REGISTERED,
        new UserRegisteredEvent({ ...rest }, validationCode!),
      );
      return {
        user: rest,
        validationCodeToken: await this.crypto.encrypt(validationCode!),
      };
    } catch (error) {
      throw error;
    }
  }

  async resendCode(code: ResendCodeDto): Promise<ResendCodeResult> {
    const validationCode = await this.crypto.decrypt(code.validationCodeToken);
    const { user, ...rest } = await this.validationCode.update(validationCode);

    this.eventEmitter.emit(USER_RESEND_CODE, new ResendCodeEvent(user!, { ...rest }));

    return {
      validationCodeToken: await this.crypto.encrypt(rest),
    };
  }

  async login(credentials: LoginUserDto) {}
}
