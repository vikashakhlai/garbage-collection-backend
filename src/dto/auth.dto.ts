import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AuthRegisterDto {
  @IsString()
  phone: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  middleName: string;

  @IsString()
  gender: 'male' | 'female';

  @IsOptional()
  @IsString()
  lastWork?: string;

  @IsOptional()
  @IsString()
  workerType?: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsNumber()
  workTime?: number;
}

export class AuthLoginDto {
  @IsString()
  phone: string;

  @IsString()
  password: string;

  @IsString()
  type: string;
}
