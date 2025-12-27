import { ConflictException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from "@nestjs/common";
import { SignupRequestDTO } from "./dto/signup.request.dto";
import { UserService } from "@core/user/user.service";
import { Crypto } from "@core/helper/crypto";
import { Authorities } from "src/core/enums/authorities.enum";
import { JwtAuthService } from "./jwt/jwt.auth.service";

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
  ) { }

  async signup(dto: SignupRequestDTO) {
    const user = await this.userService.findOne({
      email: dto.email,
    });

    if (user) {
      throw new ConflictException("User already exists");
    }

    try {
      const hashedPassword = await Crypto.hashPassword(dto.password);

      const newUser = await this.userService.createWithRolesAndRoles({
        email: dto.email,
        password: hashedPassword,
        userRoles: {
          create: [
            {
              role: {
                connect: {
                  name: Authorities.GUEST,
                }
              },
            }
          ],
        },
      });

      this.logger.log(`User created: ${newUser.id} at ${new Date().toISOString()}`);

      return JwtAuthService.calculateJWTPayload(newUser);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async signin(dto: SignupRequestDTO) {
    try {
      const user = await this.userService.findOneWithRolesAndRoles({
        email: dto.email,
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      const isPasswordMatched = await Crypto.comparePassword(dto.password, user.password);

      if (!isPasswordMatched) {
        throw new UnauthorizedException();
      }

      this.logger.log(`User signed in: ${user.id} at ${new Date().toISOString()}`);

      return JwtAuthService.calculateJWTPayload(user);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

  }

  async validateUser(id: string) {
    const user = await this.userService.findOneWithRolesAndRoles({ id });

    if (!user) {
      throw new UnauthorizedException();
    }

    this.logger.log(`User validated: ${user.id} at ${new Date().toISOString()}`);

    return JwtAuthService.calculateJWTPayload(user);
  }
}
