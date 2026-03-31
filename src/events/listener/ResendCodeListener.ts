import { USER_RESEND_CODE } from '@/constantes/event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailService } from '@/modules/mail/mail.service';
import { ResendCodeEvent } from '@/events/class/ResendCodeEvent';

@Injectable()
export class ResendCodeListener {
  constructor(private readonly mailService: MailService) {}

  @OnEvent(USER_RESEND_CODE)
  handleResendCodeEvent({ user, validationCode }: ResendCodeEvent) {
    this.mailService.sendEmail({
      to: [user.email!],
      subject: 'New Validation Code',
      template: 'mail/resend-code',
      context: {
        user,
        validationCode,
      },
    });
  }
}
