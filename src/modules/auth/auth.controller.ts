import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupRequestDTO } from "./dto/signup.request.dto";
import { JwtAuthService } from "@core/auth/jwt/jwt.auth.service";
import { SignupResponseDTO } from "./dto/signup.response.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtAuthService: JwtAuthService
  ) { }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: SignupRequestDTO): Promise<SignupResponseDTO> {
    const user = await this.authService.signup(dto);
    return this.jwtAuthService.signAsync(user);
  }
}