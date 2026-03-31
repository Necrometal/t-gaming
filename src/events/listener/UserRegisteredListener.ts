import { USER_REGISTERED } from '@/constantes/event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '@/events/class/UserRegisteredEvent';
import { MailService } from '@/modules/mail/mail.service';

@Injectable()
export class UserRegisteredListener {
  constructor(private readonly mailService: MailService) {}

  @OnEvent(USER_REGISTERED)
  handleUserRegisteredEvent({ user, validationCode }: UserRegisteredEvent) {
    this.mailService.sendEmail({
      to: [user.email!],
      subject: 'Account Registration',
      template: 'mail/register',
      context: {
        user,
        validationCode,
      },
    });
  }
}
