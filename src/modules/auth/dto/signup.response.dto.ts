import { JWTSignType } from "../jwt/types/jwt.sign.type";

export class SignupResponseDTO implements JWTSignType {
  accessToken: string;
  expiresIn: string;
}