import { VerificationCodeModel } from '@/domain/models/verificationCodeModel';
import { VerificationCodeType } from '@/domain/usecases/verificationCode/CreateVerificationCode';

export type VerificationCodeParams = {
  email: string;
  code: string;
  type: VerificationCodeType;
}

export interface IFindVerificationCode {
  find(params: VerificationCodeParams): Promise<VerificationCodeModel | null>
}
