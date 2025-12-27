import { AppConfig } from "@core/config/app.config";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWTSignType } from "./types/jwt.sign.type";
import { UserWithRolesAndRoles } from "@core/user/types/user.type";
import { JWTPayloadType } from "./types/jwt.payload.type";

@Injectable()
export class JwtAuthService {

  constructor(private readonly jwtService: JwtService) { }

  async signAsync(payload: JWTPayloadType): Promise<JWTSignType> {
    const secret = await this.jwtService.signAsync(payload);

    return {
      accessToken: secret,
      expiresIn: AppConfig.jwtExpiresIn,
    };
  }

  async verifyAsync(token: string): Promise<JWTPayloadType> {
    return this.jwtService.verifyAsync(token);
  }

  static calculateJWTPayload(user: UserWithRolesAndRoles): JWTPayloadType {
   return {
      sub: user.id,
      email: user.email,
      roles: user.userRoles?.map((role) => role.role.name),
    }
  }
}