import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import mailConfig from '@/configs/mail';

@Global()
@Module({
  imports: [mailConfig()],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
