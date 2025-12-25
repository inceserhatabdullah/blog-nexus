import { ConflictException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignupDTO } from "./dto/signup.dto";
import { UserService } from "@core/user/user.service";
import { Crypto } from "@core/helper/crypto";
import { Authorities } from "src/core/enums/authorities.enum";

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  async signup(dto: SignupDTO) {
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

      console.log(newUser);
      this.logger.log(`User created: ${newUser.id} / ${newUser.email} at ${newUser.createdAt}`);

      const jwtPayload = {
        sub: newUser.id,
        email: newUser.email,
        roles: newUser.userRoles?.map((role) => role.role.name),
      };

      const accessToken = await this.jwtService.signAsync(jwtPayload);

      return {
        accessToken,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

  }
}
