import { Injectable } from '@nestjs/common';
import { UsersService } from '@/http/global/users/users.service';
import { CreateUserDto, LoginUserDto } from '@/http/global/users/dto/user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { USER_REGISTERED } from '@/constantes/event';
import { UserRegisteredEvent } from '@/events/class/UserRegisteredEvent';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private eventEmitter: EventEmitter2,
  ) {}

  async register(user: CreateUserDto) {
    try {
      const { validationCode, ...rest } = await this.usersService.createUser(user);
      this.eventEmitter.emit(
        USER_REGISTERED,
        new UserRegisteredEvent({ ...rest }, validationCode!),
      );
      return rest;
    } catch (error) {
      throw error;
    }
  }

  async login(credentials: LoginUserDto) {}
}
