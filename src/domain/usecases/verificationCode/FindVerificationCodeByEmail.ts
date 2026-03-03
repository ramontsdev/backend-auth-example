import { VerificationCodeModel } from '@/domain/models/verificationCodeModel';
import { VerificationCodeType } from '@/domain/usecases/verificationCode/CreateVerificationCode';

export type VerificationCodeByEmail = {
  email: string;
  type: VerificationCodeType;
}

export interface IFindVerificationCodeByEmail {
  findByEmail(params: VerificationCodeByEmail): Promise<VerificationCodeModel | null>
}
