import { IFindUserByEmail } from '@/domain/usecases/user/FindUserByEmail';
import { IUpdateUser } from '@/domain/usecases/user/UpdateUser';
import { IDeleteVerificationCode } from '@/domain/usecases/verificationCode/DeleteVerificationCode';
import { IFindVerificationCode } from '@/domain/usecases/verificationCode/FindVerificationCode';
import { badRequest, conflict, noContent } from '@/presentation/helpers/httpHelpers';
import { IController } from '@/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http';
import { confirmEmailSchema } from '@/presentation/validations/authentication/confirmEmailSchema';

export class ConfirmEmailController implements IController {
  constructor(
    private readonly findUserByEmail: IFindUserByEmail,
    private readonly findVerificationCode: IFindVerificationCode,
    private readonly deleteVerificationCode: IDeleteVerificationCode,
    private readonly updateUser: IUpdateUser,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { success, data, error } = confirmEmailSchema.safeParse(httpRequest.body);

    if (!success) {
      return badRequest(error.issues.map(issue => ({
        field: issue.path.join('.'),
        error: issue.message,
      })));
    }

    const { code, email } = data;

    const user = await this.findUserByEmail.findByEmail(email);

    if (!user) {
      return badRequest({ error: 'E-mail não encontrado' });
    }

    if (user.isEmailVerified) {
      return conflict({ error: 'E-mail já verificado' });
    }

    const verificationCode = await this.findVerificationCode.find({
      email,
      code,
      type: 'EMAIL_VERIFICATION',
    });

    if (!verificationCode) {
      return badRequest({ error: 'Código inválido' });
    }

    if (verificationCode.expiresAt < new Date()) {
      await this.deleteVerificationCode.delete({
        email,
        code,
        type: 'EMAIL_VERIFICATION',
      });

      return badRequest({ error: 'Código expirado' });
    }

    await this.deleteVerificationCode.delete({
      email,
      code,
      type: 'EMAIL_VERIFICATION',
    });

    await this.updateUser.update({
      id: user.id,
      isEmailVerified: true,
      email: user.email,
      name: user.name,
    });

    return noContent();
  }
}
