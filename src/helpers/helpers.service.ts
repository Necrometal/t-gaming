import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { env } from 'prisma/config';

@Injectable()
export class HelpersService {
  static async hash(text: string) {
    return await bcrypt.hash(text, parseInt(env('BCRYPT_SALT')));
  }
}
