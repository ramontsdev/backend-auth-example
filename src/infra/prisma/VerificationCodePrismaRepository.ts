import { CreateCodeParams, ICreateVerificationCodeRepository } from '@/data/protocols/repositories/verificationCode/CreateVerificationCodeRepository';
import { IDeleteVerificationCodeRepository } from '@/data/protocols/repositories/verificationCode/DeleteVerificationCodeRepository';
import { IFindVerificationCodeByEmailRepository } from '@/data/protocols/repositories/verificationCode/FindVerificationCodeByEmailRepository';
import { IFindVerificationCodeRepository } from '@/data/protocols/repositories/verificationCode/FindVerificationCodeRepository';
import { VerificationCodeModel } from '@/domain/models/verificationCodeModel';
import { VerificationCodeParams } from '@/domain/usecases/verificationCode/FindVerificationCode';

import { PrismaClient } from './prismaClient';

export class VerificationCodePrismaRepository implements
  ICreateVerificationCodeRepository,
  IFindVerificationCodeRepository,
  IFindVerificationCodeByEmailRepository,
  IDeleteVerificationCodeRepository {

  constructor(private readonly prismaClient: PrismaClient) {}

  async create(params: CreateCodeParams): Promise<VerificationCodeModel> {
    const createdVerificationCode = await this.prismaClient.verificationCode.create({
      data: {
        email: params.email,
        code: params.code,
        expiresAt: params.expiresAt,
      },
    });

    return createdVerificationCode;
  }

  async findCode(params: VerificationCodeParams): Promise<VerificationCodeModel | null> {
    const verificationCode = await this.prismaClient.verificationCode.findUnique({
      where: {
        email: params.email,
        code: params.code,
      },
    });

    return verificationCode;
  }

  async findCodeByEmail(email: string): Promise<VerificationCodeModel | null> {
    const verificationCode = await this.prismaClient.verificationCode.findFirst({
      where: { email },
    });

    return verificationCode;
  }

  async deleteCode(params: VerificationCodeParams): Promise<void> {
    await this.prismaClient.verificationCode.delete({
      where: {
        email: params.email,
        code: params.code,
      },
    });
  }
}
