import { createParamDecorator } from "@nestjs/common"
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host"
import { JWTPayloadInterface } from "@core/auth/jwt/interfaces/jwt.payload.interface"

export const ActiveUser = createParamDecorator((param: keyof JWTPayloadInterface | undefined, ctx: ExecutionContextHost) => {
  const request = ctx.switchToHttp().getRequest();
  return param ? request.user[param] : request.user
});