import { USER_RESET_PASSWORD } from '@/constantes/event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailService } from '@/modules/mail/mail.service';
import { UserResetPasswordEvent } from '@/events/class/UserResetPasswordEvent';

@Injectable()
export class UserResetPasswordListener {
  constructor(private readonly mailService: MailService) {}

  @OnEvent(USER_RESET_PASSWORD)
  handleResendCodeEvent({ user, validationCode }: UserResetPasswordEvent) {
    this.mailService.sendEmail({
      to: [user.email!],
      subject: 'Reset Password',
      template: 'mail/reset-password',
      context: {
        user,
        validationCode,
      },
    });
  }
}
