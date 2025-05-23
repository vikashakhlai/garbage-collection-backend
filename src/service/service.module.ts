import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, PrismaService, ConfigService, JwtStrategy],
})
export class ServiceModule {}
