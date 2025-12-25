import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from '@core/config/app.config';
import { UserModule } from './../user/user.module';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: AppConfig.jwtSecret,
        signOptions: { expiresIn: AppConfig.jwtExpiresIn },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
