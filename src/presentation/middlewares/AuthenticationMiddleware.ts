import { IDecrypter } from '@/domain/cryptography/decrypter';
import { IFindUserById } from '@/domain/usecases/user/FindUserById';
import { ok, unauthorized } from '@/presentation/helpers/httpHelpers';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http';
import { IMiddleware } from '@/presentation/protocols/middleware';

export class AuthenticationMiddleware implements IMiddleware {
  constructor(
    private readonly findUserById: IFindUserById,
    private readonly decrypter: IDecrypter,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { authorization } = httpRequest.headers;

    if (!authorization) {
      return unauthorized({ error: 'Não autorizado' });
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      return unauthorized({ error: 'Não autorizado' });
    }

    const payload = await this.decrypter.decrypt(token) as { sub: string; };

    if (!payload) {
      return unauthorized({ error: 'Não autorizado' });
    }

    const { sub } = payload;

    const user = await this.findUserById.findById(sub);

    if (!user) {
      return unauthorized({ error: 'Não autorizado' });
    }

    return ok({
      account: {
        userId: user.id,
      },
    });
  }
}
