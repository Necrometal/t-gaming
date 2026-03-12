import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from '@/admin/roles/roles.module';
import { PrismaModule } from '@/modules/prisma';

@Module({
  imports: [ConfigModule.forRoot(), RolesModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
