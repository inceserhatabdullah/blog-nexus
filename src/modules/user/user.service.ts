import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma/service';
import { User, Prisma } from '@core/prisma/client';
import { UserWhereUniqueInput } from '@core/prisma/models';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async user(userWhereUniqueInput: UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        isActive: true,
        ...userWhereUniqueInput
      }
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    return this.prisma.user.findMany(params);
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    return this.prisma.user.update(params);
  }

  async delete(userWhereUniqueInput: UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.update({ where: userWhereUniqueInput, data: { isActive: false } });
  }
}
