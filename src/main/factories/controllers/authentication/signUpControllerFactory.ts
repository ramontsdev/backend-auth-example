import { makeBcryptAdapter } from '@/main/factories/adapters/bcryptAdapterFactory';
import { makeSESGatewayAdapter } from '@/main/factories/adapters/sesGatewayAdapterFactory';
import { makeCreateUserUsecase } from '@/main/factories/usecases/user/createUserUsecaseFactory';
import { makeCreateVerificationCodeUsecase } from '@/main/factories/usecases/verificationCode/createVerificationCodeUsecaseFactory';
import { SignUpController } from '@/presentation/controllers/authentication/SignUpController';

import { makeFindUserByDocumentUsecase } from '../../usecases/user/findUserByDocumentFactory';
import { makeFindUserByEmailUsecase } from '../../usecases/user/findUserByEmailUsecaseFactory';

export function makeSignUpController() {
  return new SignUpController(
    makeFindUserByDocumentUsecase(),
    makeFindUserByEmailUsecase(),
    makeCreateUserUsecase(),
    makeCreateVerificationCodeUsecase(),
    makeBcryptAdapter(),
    makeSESGatewayAdapter(),
  );
}
