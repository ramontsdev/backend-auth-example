import { VerificationCodeModel } from '@/domain/models/verificationCodeModel';

export type VerificationCodeType = 'EMAIL_VERIFICATION' | 'PASSWORD_RESET';

export type CreateVerificationCodeParams = {
  email: string;
  expiresAt: Date;
  type: VerificationCodeType;
}

export interface ICreateVerificationCode {
  create(params: CreateVerificationCodeParams): Promise<VerificationCodeModel>;
}
