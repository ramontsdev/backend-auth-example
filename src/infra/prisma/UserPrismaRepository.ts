import { IUpdatePasswordRepository } from '@/data/protocols/repositories/authentication/UpdatePasswordRepository';
import { ICreateUserRepository } from '@/data/protocols/repositories/user/CreateUserRepository';
import { IFindUserByDocumentRepository } from '@/data/protocols/repositories/user/FindUserByDocumentRepository';
import { IFindUserByEmailRepository } from '@/data/protocols/repositories/user/FindUserByEmailRepository';
import { IUpdateUserRepository } from '@/data/protocols/repositories/user/UpdateUserRepository';
import { UserModel } from '@/domain/models/userModel';
import { UpdatePasswordDTO } from '@/domain/usecases/authentication/UpdatePassword';
import { CreateUserDTO } from '@/domain/usecases/user/CreateUser';
import { UpdateUserDto } from '@/domain/usecases/user/UpdateUser';

import { PrismaClient } from './prismaClient';

export class UserPrismaRepository implements
  IFindUserByEmailRepository,
  ICreateUserRepository,
  IUpdateUserRepository,
  IUpdatePasswordRepository,
  IFindUserByDocumentRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create(data: CreateUserDTO): Promise<UserModel> {
    const user = await this.prismaClient.user.create({ data });

    return user;
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await this.prismaClient.user.findUnique({ where: { email } });

    return user;
  }

  async findById(id: string): Promise<UserModel | null> {
    const user = await this.prismaClient.user.findUnique({ where: { id } });

    return user;
  }

  async findByDocument(document: string): Promise<UserModel | null> {
    const user = await this.prismaClient.user.findUnique({ where: { document } });

    return user;
  }

  async update(updateUserData: UpdateUserDto): Promise<UserModel> {
    const updatedUser = await this.prismaClient.user.update({
      where: { id: updateUserData.id },
      data: {
        email: updateUserData.email,
        name: updateUserData.name,
        isEmailVerified: updateUserData.isEmailVerified,
      },
    });

    return updatedUser;
  }

  async updatePassword(updatePasswordData: UpdatePasswordDTO): Promise<void> {
    await this.prismaClient.user.update({
      where: { id: updatePasswordData.userId },
      data: {
        password: updatePasswordData.password,
      },
    });
  }
}
