import { Global, Module } from '@nestjs/common';
import { ValidationCodeRepositoryService } from './validation-code-repository.service';

@Global()
@Module({
  providers: [ValidationCodeRepositoryService],
  exports: [ValidationCodeRepositoryService],
})
export class ValidationCodeRepositoryModule {}
