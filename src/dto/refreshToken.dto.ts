import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString({
    message: 'Нет токена или токен не является строкой!',
  })
  refreshToken: string;
}
