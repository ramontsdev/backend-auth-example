import jwt, { Secret, SignOptions } from 'jsonwebtoken';

import { IDecrypter } from '@/domain/cryptography/decrypter';
import { IEncrypter } from '@/domain/cryptography/encrypter';
import { authConfig } from '@/main/config/authConfig';

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: any): Promise<string> {
    const options: SignOptions = {
      expiresIn: authConfig.accessTokenExpiresIn as SignOptions['expiresIn'],
    };

    return jwt.sign(
      value as string | object,
      this.secret as Secret,
      options,
    );
  }

  async decrypt(value: string): Promise<Record<string, unknown> | null> {
    try {
      return jwt.verify(value, this.secret as Secret) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
}
