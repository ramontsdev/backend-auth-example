import { ICodeGenerator } from '@/data/protocols/CodeGenerator';
import { ICreateVerificationCodeRepository } from '@/data/protocols/repositories/verificationCode/CreateVerificationCodeRepository';
import { VerificationCodeModel } from '@/domain/models/verificationCodeModel';
import { CreateVerificationCodeParams, ICreateVerificationCode } from '@/domain/usecases/verificationCode/CreateVerificationCode';

export class CreateVerificationCodeUsecase implements ICreateVerificationCode {
  constructor(
    private readonly verificationCodeRepository: ICreateVerificationCodeRepository,
    private readonly codeGenerator: ICodeGenerator,
  ) {}

  async create(params: CreateVerificationCodeParams): Promise<VerificationCodeModel> {
    const code = await this.codeGenerator.generate();

    return this.verificationCodeRepository.create({
      email: params.email,
      code,
      expiresAt: params.expiresAt,
      type: params.type,
    });
  }
}
