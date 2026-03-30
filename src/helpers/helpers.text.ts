import * as bcrypt from 'bcrypt';
import { env } from 'prisma/config';

export const hash = async (text: string) => {
  return await bcrypt.hash(text, parseInt(env('BCRYPT_SALT')));
};
