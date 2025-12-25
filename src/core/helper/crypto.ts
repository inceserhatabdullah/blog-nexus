import * as argon2 from "argon2";

export class Crypto {
  static async hashPassword(password: string) {
    return await argon2.hash(password);
  }

  static async comparePassword(password: string, hash: string) {
    return await argon2.verify(hash, password);
  }
}