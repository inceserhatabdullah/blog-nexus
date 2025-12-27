import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthService } from "../auth.service";
import { AppConfig } from "@core/config/app.config";
import { JWTPayloadType } from "../jwt/types/jwt.payload.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: AppConfig.jwtSecret,
      ignoreExpiration: false,
    });
  }

 validate(payload: JWTPayloadType) {
    return this.authService.validateUser(payload.sub);
  }
}
