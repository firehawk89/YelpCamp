import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from 'src/types/user';

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
  const request: RequestWithUser = ctx.switchToHttp().getRequest();
  return request.user;
});
