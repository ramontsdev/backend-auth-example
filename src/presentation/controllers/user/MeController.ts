import { IFindUserById } from '@/domain/usecases/user/FindUserById';
import { ok, unauthorized } from '@/presentation/helpers/httpHelpers';
import { IController } from '@/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http';

export class MeController implements IController {
  constructor(
    private readonly findUserById: IFindUserById
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { account } = httpRequest;

    if (!account) {
      return unauthorized({ error: 'Acesso negado' });
    }

    const user = await this.findUserById.findById(account.userId);

    if (!user) {
      return unauthorized({ error: 'Usuário não encontrado' });
    }

    const { password: _, ...userWithoutPassword } = user;

    return ok(userWithoutPassword);
  }
}
