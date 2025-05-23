import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, ConfigService, JwtStrategy],
})
export class OrderModule {}
