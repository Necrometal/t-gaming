import { Global, Module } from '@nestjs/common';
import { RoleRepositoryService } from './role-repository.service';

@Global()
@Module({
  providers: [RoleRepositoryService],
  exports: [RoleRepositoryService],
})
export class RoleRepositoryModule {}
