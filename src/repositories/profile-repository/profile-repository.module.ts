import { Global, Module } from '@nestjs/common';
import { ProfileRepositoryService } from './profile-repository.service';

@Global()
@Module({
  providers: [ProfileRepositoryService],
  exports: [ProfileRepositoryService],
})
export class ProfileRepositoryModule {}
