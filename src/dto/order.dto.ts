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

  @IsNumber()
  distance: number;

  @IsNumber()
  floor: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsNumber()
  hour: number;

  @IsBoolean()
  isHeavy: boolean;

  @IsBoolean()
  isDisassembly: boolean;

  servicesIds: number[];
}
