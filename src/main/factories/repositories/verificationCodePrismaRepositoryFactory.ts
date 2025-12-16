import { prismaClient } from '@/infra/prisma/prismaClient';
import { VerificationCodePrismaRepository } from '@/infra/prisma/VerificationCodePrismaRepository';

export function makeVerificationCodePrismaRepository() {
  return new VerificationCodePrismaRepository(prismaClient);
}
