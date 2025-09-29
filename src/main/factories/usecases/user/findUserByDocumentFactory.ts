import { FindUserByDocumentUsecase } from '@/data/usecases/user/FindUserByDocumentUsecase';
import { makeUserPrismaRepository } from '@/main/factories/repositories/userPrismaRepositoryFactory';

export function makeFindUserByDocumentUsecase() {

  return new FindUserByDocumentUsecase(makeUserPrismaRepository());
}

