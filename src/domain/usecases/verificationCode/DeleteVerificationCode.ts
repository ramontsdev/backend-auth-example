import { VerificationCodeType } from '@/domain/usecases/verificationCode/CreateVerificationCode';

export interface IDeleteVerificationCode {
  delete(params: { email: string; code: string; type: VerificationCodeType }): Promise<void>;
}
