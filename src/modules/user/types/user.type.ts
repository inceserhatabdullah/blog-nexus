import { Prisma } from '@core/prisma/generated/client';

export type UserWithRoles = Prisma.UserGetPayload<{
  include: { userRoles: true };
}>;
export type UserWithRolesAndRoles = Prisma.UserGetPayload<{
  include: { userRoles: { include: { role: true } } };
}>;
