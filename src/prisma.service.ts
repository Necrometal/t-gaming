import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { env } from 'prisma/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb({
      host: env('DATABASE_HOST'),
      port: parseInt(env('DATABASE_PORT')),
      user: env('DATABASE_USER'),
      password: env('DATABASE_PASSWORD'),
      database: env('DATABASE_NAME'),
    });
    super({ adapter });
  }
}
