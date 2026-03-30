import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from '@/http/global/roles/roles.module';
import { PrismaModule } from '@/modules/prisma';
import { AuthModule } from '@/http/auth/auth.module';
import { UsersModule } from '@/http/global/users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaExceptionInterceptor } from '@/exceptions/prisma/prisma-exception/prisma-exception.interceptor';
import { CqrsModule } from '@nestjs/cqrs';
@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule.forRoot(),
    RolesModule,
    PrismaModule,
    UsersModule,
    AuthModule,
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
