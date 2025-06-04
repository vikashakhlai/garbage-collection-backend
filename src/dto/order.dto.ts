import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  totalPrice: number;

  @IsString()
  phone: string;

  date: Date;

  @IsString()
  time: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  flat?: string;

  @IsOptional()
  @IsString()
  entrance?: string;

  @IsOptional()
  @IsNumber()
  distance?: number;

  @IsNumber()
  hour: number;

  @IsOptional()
  @IsNumber()
  floor?: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsNumber()
  weight: number;

  @IsNumber()
  dimensions: number;

  @IsBoolean()
  isHeavy: boolean;

  @IsBoolean()
  isDisassembly: boolean;

  servicesIds: number[];
}
