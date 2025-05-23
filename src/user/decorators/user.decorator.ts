import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';

type TypeData = keyof PrismaUser;

export const User = createParamDecorator(
  (data: TypeData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  }
);
