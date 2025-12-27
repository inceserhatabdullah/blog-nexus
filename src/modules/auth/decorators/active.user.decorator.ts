import { createParamDecorator } from "@nestjs/common"
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host"
import { JWTPayloadType } from "../jwt/types/jwt.payload.type"

export const ActiveUser = createParamDecorator((param: keyof JWTPayloadType | undefined, ctx: ExecutionContextHost) => {
  const request = ctx.switchToHttp().getRequest();
  return param ? request.user[param] : request.user
});