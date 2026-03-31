import { Injectable } from '@nestjs/common';
import { UsersService } from '@/http/global/users/users.service';
import { CreateUserDto, LoginUserDto } from '@/http/global/users/dto/user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { USER_REGISTERED } from '@/constantes/event';
import { UserRegisteredEvent } from '@/events/class/UserRegisteredEvent';
import { CryptoService } from '@/modules/crypto/crypto.service';
import { UserRegisteredResult } from '@/http/model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private eventEmitter: EventEmitter2,
    private readonly crypto: CryptoService,
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

  async login(credentials: LoginUserDto) {}
}
