import { IHasher } from '@/domain/cryptography/hasher';
import { ICreateUser } from '@/domain/usecases/user/CreateUser';
import { IFindUserByDocument } from '@/domain/usecases/user/FindUserByDocument';
import { IFindUserByEmail } from '@/domain/usecases/user/FindUserByEmail';
import { ICreateVerificationCode } from '@/domain/usecases/verificationCode/CreateVerificationCode';
import { env } from '@/main/config/env';
import { buildWelcomeEmailTemplate } from '@/presentation/helpers/emailTemplates/welcomeEmailTemplate';
import { badRequest, ok } from '@/presentation/helpers/httpHelpers';
import { IController } from '@/presentation/protocols/controller';
import { IEmailGateway } from '@/presentation/protocols/EmailGateways';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http';
import { signUpSchema } from '@/presentation/validations/authentication/signUpSchema';

export class SignUpController implements IController {
  constructor(
    private readonly findUserByDocument: IFindUserByDocument,
    private readonly findUserByEmail: IFindUserByEmail,
    private readonly createUser: ICreateUser,
    private readonly createVerificationCode: ICreateVerificationCode,
    private readonly hasher: IHasher,
    private readonly emailGateway: IEmailGateway,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { success, data, error } = signUpSchema.safeParse(httpRequest.body);

    if (!success) {
      return badRequest(error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message,
      })));
    }

    const { name, email, password, document } = data;

    const userByDocument = await this.findUserByDocument.findByDocument(document);

    if (userByDocument) {
      return badRequest([{ field: 'document', message: 'User already exists' }]);
    }

    const userByEmail = await this.findUserByEmail.findByEmail(email);

    if (userByEmail) {
      return badRequest([{ field: 'email', message: 'User already exists' }]);
    }

    const hashedPassword = await this.hasher.hash(password);

    const user = await this.createUser.create({ name, email, password: hashedPassword, document });

    const verificationCode = await this.createVerificationCode.create({
      email,
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    });

    await this.emailGateway.sendEmail({
      from: `${env.app.name}<${env.app.email}>`,
      to: [email],
      subject: `Bem-vindo ao ${env.app.name}! 🎉`,
      html: buildWelcomeEmailTemplate({
        name,
        verificationCode: verificationCode.code,
      }),
    });

    return ok(user);
  }
}
