import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createLicenseDto } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    const user = this.prisma.user.findFirst({
      where: {
        id: +id,
      },
    });

    if (!user) throw new NotFoundException('Такого пользователя не существует');
    (await user).password = undefined;
    return { ...user };
  }

  async createLicense(dto: createLicenseDto, userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: +userId,
      },
    });

    if (!user) throw new NotFoundException('Пользователь не найден');
    if (user.type === 'client' || user.workerType !== 'driver')
      throw new BadRequestException('Пользователь не водитель');

    return await this.prisma.user.update({
      where: {
        id: +userId,
      },
      data: {
        licenseImage: dto.licenseImage,
      },
    });
  }

  async confirmDriver(driverId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: +driverId,
      },
    });

    if (!user) throw new NotFoundException('Пользователь не найден');
    if (user.type !== 'worker' && user.workerType !== 'driver')
      throw new NotFoundException(
        'Пользователь не является работником или водителем!'
      );

    await this.prisma.user.update({
      where: {
        id: +driverId,
      },
      data: {
        isConfirmDriver: true,
      },
    });

    return { status: 200, message: 'Успешное подтверждение' };
  }

  async unConfirmDriver(driverId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: +driverId,
      },
    });

    if (!user) throw new NotFoundException('Пользователь не найден');
    if (user.type !== 'worker' && user.workerType !== 'driver')
      throw new NotFoundException(
        'Пользователь не является работником или водителем!'
      );

    await this.prisma.user.update({
      where: {
        id: +driverId,
      },
      data: {
        isConfirmDriver: false,
      },
    });

    return { status: 200, message: 'Успешное отклонение' };
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: +id,
      },
    });
    if (!user) throw new NotFoundException('Пользователь не найден');

    await this.prisma.user.delete({
      where: {
        id: +id,
      },
    });

    return 'Пользователь успешно удален';
  }
}
