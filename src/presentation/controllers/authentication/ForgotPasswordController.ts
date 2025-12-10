import { IFindUserByEmail } from '@/domain/usecases/user/FindUserByEmail';
import { ICreateVerificationCode } from '@/domain/usecases/verificationCode/CreateVerificationCode';
import { IDeleteVerificationCode } from '@/domain/usecases/verificationCode/DeleteVerificationCode';
import { IFindVerificationCodeByEmail } from '@/domain/usecases/verificationCode/FindVerificationCodeByEmail';
import { env } from '@/main/config/env';
import { buildForgotPasswordEmailTemplate } from '@/presentation/helpers/emailTemplates/forgotPasswordEmailTemplate';
import { badRequest, noContent } from '@/presentation/helpers/httpHelpers';
import { IController } from '@/presentation/protocols/controller';
import { IEmailGateway } from '@/presentation/protocols/EmailGateways';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http';
import { forgotPasswordSchema } from '@/presentation/validations/authentication/forgotPasswordSchema';

export class ForgotPasswordController implements IController {
  constructor(
    private readonly findUserByEmail: IFindUserByEmail,
    private readonly findVerificationCodeByEmail: IFindVerificationCodeByEmail,
    private readonly deleteVerificationCode: IDeleteVerificationCode,
    private readonly createVerificationCode: ICreateVerificationCode,
    private readonly emailGateway: IEmailGateway,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { success, data, error } = forgotPasswordSchema.safeParse(request.body);

    if (!success) {
      return badRequest(error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message,
      })));
    }

    const { email } = data;

    const user = await this.findUserByEmail.findByEmail(email);

    if (!user) {
      return badRequest([{ field: 'email', message: 'E-mail not found' }]);
    }

    const existingVerificationCode = await this.findVerificationCodeByEmail.findByEmail(email);

    if (existingVerificationCode) {
      await this.deleteVerificationCode.delete({ email, code: existingVerificationCode.code });
    }

    const newVerificationCode = await this.createVerificationCode.create({ email, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) });

    await this.emailGateway.sendEmail({
      from: `${env.app.name}<${env.app.email}>`,
      to: [email],
      subject: 'Recuperação de senha',
      html: buildForgotPasswordEmailTemplate({ verificationCode: newVerificationCode.code }),
    });

    return noContent();
  }
}
