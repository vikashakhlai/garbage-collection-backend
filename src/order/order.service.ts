import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from 'src/dto/order.dto';
import { PrismaService } from 'src/prisma.service';
import { convertPostgreDate } from 'src/utils/convertPostgreDate';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllOrders() {
    return await this.prisma.order.findMany({
      include: {
        services: {
          include: {
            service: true,
          },
        },
      },
    });
  }

  async getAllActiveOrders() {
    return await this.prisma.order.findMany({
      where: {
        isCompleted: null,
      },
      include: {
        services: {
          include: {
            service: true,
          },
        },
      },
    });
  }
  async getAllActiveUserOrders(userId: number) {
    return await this.prisma.order.findMany({
      where: {
        isCompleted: null,
        userId: +userId,
      },
      include: {
        services: {
          include: {
            service: true,
          },
        },
      },
    });
  }

  async getOrderById(orderId: number) {
    return await this.prisma.order.findFirst({
      where: {
        id: +orderId,
      },
    });
  }

  async getUserOrders(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: +userId,
      },
    });
    if (!user) throw new NotFoundException('Пользователь не найден');
    return await this.prisma.order.findMany({
      where: {
        userId: +userId,
      },
      include: {
        services: {
          include: {
            service: true,
          },
        },
        Worker: {
          select: {
            firstName: true,
            lastName: true,
            middleName: true,
            phone: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async getUserActiveOrders(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: +userId,
      },
    });
    if (!user) throw new NotFoundException('Пользователь не найден');
    return await this.prisma.order.findMany({
      where: {
        userId: +userId,
        isCompleted: null,
      },
      include: {
        services: {
          include: {
            service: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async createOrder(userId: number, dto: CreateOrderDto) {
    const service = await this.prisma.service.findFirst({
      where: {
        id: +dto.servicesIds[0],
      },
    });
    if (!service) throw new NotFoundException('Данного сервиса не существует');

    return await this.prisma.order.create({
      data: {
        totalPrice: +dto.totalPrice,
        isCompleted: null,
        phone: dto.phone,
        date: convertPostgreDate(dto.date),
        time: dto.time,
        address: dto.address,
        distance: +dto.distance,
        floor: +dto.floor,
        comment: dto.comment,
        userId: +userId,

        services: {
          create: dto.servicesIds.map((serviceId) => ({
            service: {
              connect: {
                id: +serviceId,
              },
            },
          })),
        },
      },
    });
  }
  async confirmOrder(orderId: number, workerId: number) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: +orderId,
      },
    });

    if (!order) throw new NotFoundException('Заказ не найден');

    const worker = await this.prisma.user.findFirst({
      where: {
        id: +workerId,
      },
    });
    if (!worker) throw new NotFoundException('Работник не найден');

    await this.prisma.order.update({
      where: {
        id: +orderId,
      },
      data: {
        isCompleted: true,
        workerId: +worker.id,
      },
    });
    return 'Заказ успешно подтвержден';
  }

  async unCheckOrder(orderId: number) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: +orderId,
      },
    });

    if (!order) throw new NotFoundException('Заказ не найден');
    await this.prisma.order.update({
      where: {
        id: +orderId,
      },
      data: {
        isCompleted: false,
      },
    });
    return 'Заказ успешно отменен';
  }
  async deleteOrder(orderId: number) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: +orderId,
      },
    });

    if (!order) throw new NotFoundException('Заказ не найден');
    await this.prisma.order.delete({
      where: {
        id: +orderId,
      },
    });

    return 'Заказ успешно удален';
  }
}
