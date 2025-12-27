import { PrismaService } from '@core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { RoleWithUserRoles } from './types/role.type';
import { Role } from '@core/prisma/generated/client';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  async findAllWithUserRoles(): Promise<RoleWithUserRoles[]> {
    return this.prisma.role.findMany({
      include: {
        userRoles: true,
      },
    });
  }
}
