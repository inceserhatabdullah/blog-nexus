import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ActiveUser } from '@core/auth/decorators/active.user.decorator';
import type { JWTPayloadInterface } from '@core/auth/jwt/interfaces/jwt.payload.interface';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  async profile(@ActiveUser() activeUser: JWTPayloadInterface) {
    const user = await this.userService.findOneWithRolesAndRoles({
      id: activeUser.sub,
    });
    return new UserEntity(user);
  }
}
