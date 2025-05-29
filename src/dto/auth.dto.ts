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
  age: string;

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

  @IsOptional()
  @IsNumber()
  dimensions?: number;
}

export class AuthLoginDto {
  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  type: string;
}
