import { Global, Module } from '@nestjs/common';
import { UserRepositoryService } from './user-repository.service';

@Global()
@Module({
  providers: [UserRepositoryService],
  exports: [UserRepositoryService],
})
export class UserRepositoryModule {}
