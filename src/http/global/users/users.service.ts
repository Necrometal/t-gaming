import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import type { User } from '@/http/model';
import { UserRepositoryService } from '@/repositories/user-repository/user-repository.service';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepositoryService) {}
  async createUser(user: CreateUserDto) {
    const result: User = await this.userRepository.create(user);

    return result;
  }

  async confirmAccount(id: number) {
    return this.userRepository.confirmAccount(id);
  }

  async findByEmailValidated(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
