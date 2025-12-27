import { AppConfig } from '@core/config/app.config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserWithRolesAndRoles } from '@core/user/types/user.type';
import { JWTPayloadInterface } from '@core/auth/jwt/interfaces/jwt.payload.interface';
import { JWTSignInterface } from '@core/auth/jwt/interfaces/jwt.sign.interface';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signAsync(payload: JWTPayloadInterface): Promise<JWTSignInterface> {
    const secret = await this.jwtService.signAsync(payload);

    return {
      accessToken: secret,
      expiresIn: AppConfig.jwtExpiresIn,
    };
  }

  async verifyAsync(token: string): Promise<JWTPayloadInterface> {
    return this.jwtService.verifyAsync(token);
  }

  static calculateJWTPayload(user: UserWithRolesAndRoles): JWTPayloadInterface {
    return {
      sub: user.id,
      email: user.email,
      roles: user.userRoles?.map((role) => role.role.name),
    };
  }
}
