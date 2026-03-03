import { VerificationCodeModel } from '@/domain/models/verificationCodeModel';
import { VerificationCodeType } from '@/domain/usecases/verificationCode/CreateVerificationCode';

export type CreateCodeParams = {
  email: string;
  code: string;
  expiresAt: Date;
  type: VerificationCodeType;
}

export interface ICreateVerificationCodeRepository {
  create(params: CreateCodeParams): Promise<VerificationCodeModel>
}
