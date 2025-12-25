import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma/prisma.service';
import { User, Prisma } from '@core/prisma/generated/client';
import { UserWhereInput } from '@core/prisma/generated/models';
import { UserWithRoles, UserWithRolesAndRoles } from './types/user.types';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async findOne(where: UserWhereInput): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        isActive: true,
        ...where
      }
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async createWithRoles(data: Prisma.UserCreateInput): Promise<UserWithRoles> {
    return this.prisma.user.create({ data, include: { userRoles: true } });
  }

  async createWithRolesAndRoles(data: Prisma.UserCreateInput): Promise<UserWithRolesAndRoles> {
    return this.prisma.user.create({ data, include: { userRoles: { include: { role: true } } } });
  }

}
