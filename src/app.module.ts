import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from '@/http/global/roles/roles.module';
import { PrismaModule } from '@/modules/prisma';
import { AuthModule } from '@/http/auth/auth.module';
import { UsersModule } from '@/http/global/users/users.module';
import { HelpersModule } from '@/helpers/helpers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RolesModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    HelpersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
