import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from '@core/config/app.config';
import { UserModule } from './../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthService } from './jwt/jwt.auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    JwtModule.registerAsync({
      global: false,
      useFactory: () => ({
        secret: AppConfig.jwtSecret,
        signOptions: { expiresIn: AppConfig.jwtExpiresIn },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthService],
  exports: [AuthService],
})
export class AuthModule {}
