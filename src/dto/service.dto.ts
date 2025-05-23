import { IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  workerType: string;

  @IsNumber()
  price: number;
}

export class UpdateServiceDto extends CreateServiceDto {
  @IsNumber()
  id: number;
}
