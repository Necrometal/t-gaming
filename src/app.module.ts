import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from '@/http/global/roles/roles.module';
import { PrismaModule } from '@/modules/prisma';
import { AuthModule } from '@/http/auth/auth.module';
import { UsersModule } from '@/http/global/users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaExceptionInterceptor } from '@/exceptions/prisma/prisma-exception/prisma-exception.interceptor';
import { CqrsModule } from '@nestjs/cqrs';
import { MailModule } from '@/modules/mail/mail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsListenerModule } from '@/modules/events-listener/events-listener.module';
import { CryptoModule } from '@/modules/crypto/crypto.module';
import { ValidationCodeModule } from '@/http/global/validation-code/validation-code.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule.forRoot(),
    EventEmitterModule.forRoot(),
    RolesModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    MailModule,
    EventsListenerModule,
    CryptoModule,
    ValidationCodeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: PrismaExceptionInterceptor,
    },
  ],
})
export class AppModule {}
