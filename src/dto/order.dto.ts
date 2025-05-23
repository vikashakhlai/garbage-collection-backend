import { IsNumber, IsString } from 'class-validator';

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

  @IsString()
  comment: string;

  servicesIds: number[];
}
