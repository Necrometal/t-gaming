import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

export type Mailer = {
  subject: string;
  template: string;
  context: ISendMailOptions['context'];
  to: string[];
  from?: string;
};

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(options: Mailer) {
    try {
      const response = await this.mailerService.sendMail(options);
    } catch (error) {
      this.logger.error(
        `Error while sending mail with the following parameters : ${JSON.stringify(options)}`,
        error,
      );

      console.log('error send email');
    }
  }
}
