import { Injectable } from '@nestjs/common';
import { UsersService } from '@/http/global/users/users.service';
import { CreateUserDto } from '@/http/global/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(user: CreateUserDto) {
    return await this.usersService.createUser(user);
  }
}
