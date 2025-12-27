import { JWTSignInterface } from "@core/auth/jwt/interfaces/jwt.sign.interface";

export class SignupResponseDTO implements JWTSignInterface {
  accessToken: string;
  expiresIn: string;
}