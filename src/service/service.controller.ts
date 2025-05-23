import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { CreateServiceDto, UpdateServiceDto } from 'src/dto/service.dto';
import { ServiceService } from './service.service';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  async getAllServices() {
    return this.serviceService.getAllServices();
  }

  @Get(':id')
  async getServiceById(@Param('id') serviceId: number) {
    return this.serviceService.getServiceById(serviceId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  // @Auth('admin')
  async createService(@Body() dto: CreateServiceDto) {
    return this.serviceService.createService(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth('admin')
  async updateService(dto: UpdateServiceDto) {
    return this.serviceService.updateService(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @Auth('admin')
  async deleteService(@Param('id') serviceId: number) {
    return this.serviceService.deleteService(serviceId);
  }
}
