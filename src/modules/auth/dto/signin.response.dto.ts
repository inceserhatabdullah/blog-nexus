import { JWTSignType } from "../jwt/types/jwt.sign.type";

export class SigninResponseDTO implements JWTSignType {
  accessToken: string;
  expiresIn: string;
}