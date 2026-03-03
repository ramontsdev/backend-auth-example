import { IHasher } from '@/domain/cryptography/hasher';
import { IUpdatePassword } from '@/domain/usecases/authentication/UpdatePassword';
import { IFindUserByEmail } from '@/domain/usecases/user/FindUserByEmail';
import { IDeleteVerificationCode } from '@/domain/usecases/verificationCode/DeleteVerificationCode';
import { IFindVerificationCode } from '@/domain/usecases/verificationCode/FindVerificationCode';
import { badRequest, noContent } from '@/presentation/helpers/httpHelpers';
import { IController } from '@/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http';
import { resetPasswordSchema } from '@/presentation/validations/authentication/resetPasswordSchema';

export class ResetPasswordController implements IController {
  constructor(
    private readonly findUserByEmail: IFindUserByEmail,
    private readonly findVerificationCode: IFindVerificationCode,
    private readonly deleteVerificationCode: IDeleteVerificationCode,
    private readonly updatePassword: IUpdatePassword,
    private readonly hasher: IHasher,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { success, data, error } = resetPasswordSchema.safeParse(httpRequest.body);

    if (!success) {
      return badRequest(error.issues.map(issue => ({
        field: issue.path.join('.'),
        error: issue.message,
      })));
    }

    const { code, email, password } = data;

    const user = await this.findUserByEmail.findByEmail(email);

    if (!user) {
      return badRequest({ error: 'E-mail não encontrado' });
    }

    const verificationCode = await this.findVerificationCode.find({
      email,
      code,
      type: 'PASSWORD_RESET',
    });

    if (!verificationCode) {
      return badRequest({ error: 'Código inválido' });
    }

    if (verificationCode.expiresAt < new Date()) {
      await this.deleteVerificationCode.delete({
        email,
        code,
        type: 'PASSWORD_RESET',
      });

      return badRequest({ error: 'Código expirado' });
    }

    await this.deleteVerificationCode.delete({
      email,
      code,
      type: 'PASSWORD_RESET',
    });

    const hashedPassword = await this.hasher.hash(password);

    await this.updatePassword.updatePassword({
      userId: user.id,
      password: hashedPassword,
    });

    return noContent();
  }
}
