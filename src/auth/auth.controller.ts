import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/auth.dto';
import { RefreshTokenDto } from 'src/dto/refreshToken.dto';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService
  ) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthRegisterDto) {
    return this.authService.register(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto);
  }
}
