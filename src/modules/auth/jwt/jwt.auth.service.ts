import { AppConfig } from "@core/config/app.config";
import { JwtPayload } from "./jwt.payload";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWTSignType } from "./types/jwt.sign.type";

@Injectable()
export class JwtAuthService {

  constructor(private readonly jwtService: JwtService) { }

  async signAsync(payload: JwtPayload): Promise<JWTSignType> {
    const secret = await this.jwtService.signAsync(payload);

    return {
      accessToken: secret,
      expiresIn: AppConfig.jwtExpiresIn,
    };
  }

  async verifyAsync(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token);
  }
}