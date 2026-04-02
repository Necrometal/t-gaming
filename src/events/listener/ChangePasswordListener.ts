import { USER_CHANGE_PASSWORD } from '@/constantes/event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailService } from '@/modules/mail/mail.service';
import { ChangePasswordEvent } from '@/events/class/ChangePasswordEvent';

@Injectable()
export class ChangePasswordListener {
  constructor(private readonly mailService: MailService) {}

  @OnEvent(USER_CHANGE_PASSWORD)
  handleResendCodeEvent({ user, date }: ChangePasswordEvent) {
    this.mailService.sendEmail({
      to: [user.email!],
      subject: 'New Validation Code',
      template: 'mail/change-password',
      context: {
        user,
        date,
      },
    });
  }
}
