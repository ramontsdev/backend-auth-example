import { IDeleteVerificationCodeRepository } from '@/data/protocols/repositories/verificationCode/DeleteVerificationCodeRepository';
import { VerificationCodeType } from '@/domain/usecases/verificationCode/CreateVerificationCode';
import { IDeleteVerificationCode } from '@/domain/usecases/verificationCode/DeleteVerificationCode';

export class DeleteVerificationCodeUsecase implements IDeleteVerificationCode {
  constructor(private readonly verificationCodeRepository: IDeleteVerificationCodeRepository) {}

  async delete(params: { email: string; code: string; type: VerificationCodeType }): Promise<void> {
    const verificationCode = await this.verificationCodeRepository.deleteCode(params);

    return verificationCode;
  }
}
