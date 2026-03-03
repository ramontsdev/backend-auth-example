import { IFindVerificationCodeByEmailRepository } from '@/data/protocols/repositories/verificationCode/FindVerificationCodeByEmailRepository';
import { VerificationCodeModel } from '@/domain/models/verificationCodeModel';
import { IFindVerificationCodeByEmail, VerificationCodeByEmail } from '@/domain/usecases/verificationCode/FindVerificationCodeByEmail';

export class FindVerificationCodeByEmailUsecase implements IFindVerificationCodeByEmail {
  constructor(private readonly verificationCodeRepository: IFindVerificationCodeByEmailRepository) {}

  async findByEmail(params: VerificationCodeByEmail): Promise<VerificationCodeModel | null> {
    const verificationCode = await this.verificationCodeRepository.findCodeByEmail(params.email, params.type);

    return verificationCode;
  }
}
