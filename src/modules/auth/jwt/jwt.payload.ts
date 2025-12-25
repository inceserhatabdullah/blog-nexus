import { UserWithRolesAndRoles } from "@core/user/types/user.types";

export class JwtPayload {
  static fromUser(user: UserWithRolesAndRoles): JwtPayload {
    return {
      sub: user.id,
      email: user.email,
      roles: user.userRoles?.map((role) => role.role.name),
    };
  }
}