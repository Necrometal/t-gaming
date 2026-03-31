import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';
import { env } from 'prisma/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  password: string = env('ENCRYPTION_PASSWORD');
  iv = randomBytes(16);
  encryptionType = 'aes-256-ctr';
  salt = env('BCRYPT_SALT');

  async hash(text: string) {
    return await bcrypt.hash(text, parseInt(env('BCRYPT_SALT')));
  }

  async encrypt(data: Object): Promise<string> {
    const key = (await promisify(scrypt)(this.password, this.salt, 32)) as Buffer;
    const cipher = createCipheriv(this.encryptionType, key, this.iv);

    const textToEncrypt = JSON.stringify(data);
    const encryptedBuffer = await Buffer.concat([
      cipher.update(textToEncrypt, 'utf-8'),
      cipher.final(),
    ]);

    const encryptedText = await Buffer.concat([this.iv, encryptedBuffer]).toString('base64');
    return encryptedText;
  }

  async decrypt(encryptedText: string) {
    const bufferToDecrypt = Buffer.from(encryptedText, 'base64');

    const iv = bufferToDecrypt.subarray(0, 16);
    const encrypted = bufferToDecrypt.subarray(16);

    const key = (await promisify(scrypt)(this.password, this.salt, 32)) as Buffer;
    const decipher = createDecipheriv(this.encryptionType, key, iv);

    const decryptedBuffer = await Buffer.concat([decipher.update(encrypted), decipher.final()]);

    const decryptedText = decryptedBuffer.toString('utf-8');
    return JSON.parse(decryptedText);
  }
}
