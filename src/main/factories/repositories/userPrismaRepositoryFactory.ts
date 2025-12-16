import { prismaClient } from '@/infra/prisma/prismaClient';
import { UserPrismaRepository } from '@/infra/prisma/UserPrismaRepository';

export function makeUserPrismaRepository() {
  return new UserPrismaRepository(prismaClient);
}
