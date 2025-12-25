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

  async findWithRoles(where: UserWhereInput): Promise<UserWithRoles | null> {
    return this.prisma.user.findFirst({
      where: {
        isActive: true,
        ...where
      },
      include: {
        userRoles: true
      }
    });
  }

  async findWithRolesAndRoles(where: UserWhereInput): Promise<UserWithRolesAndRoles | null> {
    return this.prisma.user.findFirst({
      where: {
        isActive: true,
        ...where
      },
      include: {
        userRoles: {
          include: {
            role: true
          }
        }
      }
    });
  }

  async softDelete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.update({
      where,
      data: {
        isActive: false
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
