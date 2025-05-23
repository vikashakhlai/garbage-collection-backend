import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, ConfigService, JwtStrategy],
})
export class UserModule {}
