import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "@qa/server/user/user.entity";

export const User = createParamDecorator((data: keyof UserEntity, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  if (!request.user) {
    return null;
  }

  if (data) {
    return request.user[data];
  }

  return request.user;
});
