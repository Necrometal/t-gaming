import { USER_CONFIRMED_ACCOUNT } from '@/constantes/event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailService } from '@/modules/mail/mail.service';
import { UserConfirmedAccountEvent } from '@/events/class/UserConfirmedAccountEvent';

@Injectable()
export class UserConfirmedAccountEventListener {
  constructor(private readonly mailService: MailService) {}

  @OnEvent(USER_CONFIRMED_ACCOUNT)
  handleConfirmedAccountEvent({ user }: UserConfirmedAccountEvent) {
    this.mailService.sendEmail({
      to: [user.email!],
      subject: 'Account confirmed',
      template: 'mail/confirmed-account',
      context: {
        user,
      },
    });
  }
}
