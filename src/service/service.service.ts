import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto, UpdateServiceDto } from 'src/dto/service.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllServices() {
    return await this.prisma.service.findMany();
  }

  async getServiceById(serviceId: number) {
    return await this.prisma.service.findFirst({
      where: {
        id: +serviceId,
      },
    });
  }

  async createService(dto: CreateServiceDto) {
    return await this.prisma.service.create({
      data: {
        price: +dto.price,
        name: dto.name,
        description: dto.description,
        workerType: dto.workerType,
        image: dto.image,
      },
    });
  }

  async updateService(dto: UpdateServiceDto) {
    return await this.prisma.service.update({
      where: {
        id: +dto.id,
      },
      data: {
        name: dto.name,
        description: dto.description,
        image: dto.image,
      },
    });
  }

  async deleteService(serviceId: number) {
    const service = await this.prisma.service.findFirst({
      where: {
        id: +serviceId,
      },
    });
    if (!service) throw new NotFoundException('Сервис не найден');
    await this.prisma.service.delete({
      where: {
        id: +serviceId,
      },
    });
    return 'Сервис успешно удален';
  }
}
