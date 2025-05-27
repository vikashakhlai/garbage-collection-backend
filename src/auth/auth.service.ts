import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare, genSalt, hash } from 'bcryptjs';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/auth.dto';
import { RefreshTokenDto } from 'src/dto/refreshToken.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async login(dto: AuthLoginDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.issueTokenPair(String(user.id));

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async register(dto: AuthRegisterDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        phone: dto.phone,
        type: dto.type,
      },
    });

    if (user)
      throw new BadRequestException(
        'Данный пользователь с текущим номером уже существует'
      );

    const salt = await genSalt(10);

    if (dto.type === 'worker') {
      const newUser = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          middleName: dto.middleName,
          phone: dto.phone,
          role: 'user',
          gender: dto.gender,
          password: await hash(dto.password, salt),
          type: dto.type,
          workerType: dto.workerType,
          lastWork: dto.lastWork,
          workTime: dto.workTime,
          dimensions: dto.dimensions,
        },
      });

      const tokens = await this.issueTokenPair(String(newUser.id));

      return {
        user: this.returnUserFields(newUser),
        ...tokens,
      };
    } else if (dto.type === 'client') {
      const newUser = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          middleName: dto.middleName,
          phone: dto.phone,
          role: 'user',
          gender: dto.gender,
          type: dto.type,
          password: await hash(dto.password, salt),
        },
      });

      const tokens = await this.issueTokenPair(String(newUser.id));

      return {
        user: this.returnUserFields(newUser),
        ...tokens,
      };
    }
  }

  async getNewTokens({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) throw new UnauthorizedException('Войдите в систему!');

    const data = await this.jwtService.verifyAsync(refreshToken);

    if (!data)
      throw new UnauthorizedException('Токен невалидный или закончился');

    const user = await this.prisma.user.findFirst({
      where: {
        id: +data.id,
      },
    });

    const tokens = await this.issueTokenPair(String(user.id));

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async validateUser(dto) {
    const user = await this.prisma.user.findFirst({
      where: {
        phone: dto.phone,
        type: dto.type,
      },
    });

    if (!user) throw new UnauthorizedException('Пользователь не найден');

    const isValidPassword = await compare(dto.password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('Неверный пароль');

    return user;
  }

  async issueTokenPair(userId: string) {
    const data = { id: userId };

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '14d',
    });
    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    });

    return { accessToken, refreshToken };
  }

  returnUserFields(user: User) {
    return {
      id: user?.id,
      phone: user.phone,
      type: user.type,
      role: user.role,
      workerType: user.workerType ? user.workerType : null,
    };
  }
}
