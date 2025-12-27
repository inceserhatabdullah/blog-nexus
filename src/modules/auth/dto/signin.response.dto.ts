import { JWTSignInterface } from "@core/auth/jwt/interfaces/jwt.sign.interface";

export class SigninResponseDTO implements JWTSignInterface {
  accessToken: string;
  expiresIn: string;
}