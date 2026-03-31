import { Global, Module } from '@nestjs/common';
import { ValidationCodeService } from './validation-code.service';

@Global()
@Module({
  providers: [ValidationCodeService],
  exports: [ValidationCodeService],
})
export class ValidationCodeModule {}
