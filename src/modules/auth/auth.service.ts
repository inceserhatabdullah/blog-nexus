import { ConflictException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from "@nestjs/common";
import { SignupRequestDTO } from "./dto/signup.request.dto";
import { UserService } from "@core/user/user.service";
import { Crypto } from "@core/helper/crypto";
import { Authorities } from "src/core/enums/authorities.enum";
import { JwtPayload } from "./jwt/jwt.payload";

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

      this.logger.log(`User created: ${newUser.id} / ${newUser.email} at ${newUser.createdAt}`);

      return JwtPayload.fromUser(newUser);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async validateUser(id: string) {
    const user = await this.userService.findOneWithRolesAndRoles({ id });

    if (!user) {
      throw new UnauthorizedException();
    }

    return JwtPayload.fromUser(user);
  }
}
