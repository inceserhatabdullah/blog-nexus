import { Prisma } from '@core/prisma/generated/client';

export type RoleWithUserRoles = Prisma.RoleGetPayload<{
  include: { userRoles: true };
}>;
