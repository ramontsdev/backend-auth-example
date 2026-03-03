import { VerificationCodeModel } from '@/domain/models/verificationCodeModel';
import { VerificationCodeType } from '@/domain/usecases/verificationCode/CreateVerificationCode';

export interface IFindVerificationCodeByEmailRepository {
  findCodeByEmail(email: string, type: VerificationCodeType): Promise<VerificationCodeModel | null>
}
