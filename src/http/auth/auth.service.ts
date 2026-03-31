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

  async register(userDto: CreateUserDto): Promise<UserRegisteredResult> {
    try {
      const { validationCode, profile, ...user } = await this.usersService.createUser(userDto);
      this.eventEmitter.emit(
        USER_REGISTERED,
        new UserRegisteredEvent({ ...user, profile }, validationCode!),
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
    const validationCode = await this.crypto.decrypt(codeDto.validationCodeToken);
    const { user, ...code } = await this.validationCode.update(validationCode);

    this.eventEmitter.emit(USER_RESEND_CODE, new ResendCodeEvent(user!, { ...code }));

    return {
      validationCodeToken: await this.crypto.encrypt(code),
    };
  }

  async login(credentials: LoginUserDto) {}
}
