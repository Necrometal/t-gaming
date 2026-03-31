import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { env } from 'prisma/config';

const mailConfig = () => {
  return MailerModule.forRootAsync({
    useFactory: () => ({
      transport: {
        host: env('MAIL_HOST'),
        port: +env('MAIL_PORT'),
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: env('MAIL_FROM_ADDRESS'),
      },
      template: {
        dir: process.cwd() + '/src/views',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  });
};

export default mailConfig;
