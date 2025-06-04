import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { CreateOrderDto } from 'src/dto/order.dto';
import { User } from 'src/user/decorators/user.decorator';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Auth()
  async findAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('/active')
  @Auth()
  async findAllActiveOrders() {
    return this.orderService.getAllActiveOrders();
  }

  @Get('/user/active')
  @Auth()
  async findAllActiveUserOrders(@User('id') userId: number) {
    return this.orderService.getAllActiveUserOrders(userId);
  }

  @Get('/worker/process')
  @Auth()
  async findAllProcessedUserOrders(@User('id') userId: number) {
    return this.orderService.getAllProcessedWorkerOrders(userId);
  }

  @Get('/user')
  @Auth()
  async findUserOrders(@User('id') userId: number) {
    return this.orderService.getUserOrders(userId);
  }

  @Get('/:id')
  @Auth()
  async findOrderById(@Param('id') orderId: number) {
    return this.orderService.getOrderById(orderId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async createOrder(@User('id') userId: number, @Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(userId, dto);
  }

  @HttpCode(200)
  @Patch('/complete-order/:id')
  @Auth()
  async completedOrder(
    @Param('id') orderId: number,
    @User('id') workerId: number
  ) {
    return this.orderService.completedOrder(orderId, workerId);
  }

  @HttpCode(200)
  @Patch('/confirm-order/:id')
  @Auth()
  async checkOrder(@Param('id') orderId: number, @User('id') workerId: number) {
    return this.orderService.confirmOrder(orderId, workerId);
  }

  @HttpCode(200)
  @Patch('/uncheck-order/:id')
  @Auth()
  async unCheckOrder(@Param('id') orderId: number) {
    return this.orderService.unCheckOrder(orderId);
  }

  @HttpCode(200)
  @Patch('/pending/:id')
  @Auth()
  async setPendingOrder(@Param('id') orderId: number) {
    return this.orderService.setPendingOrder(orderId);
  }

  @HttpCode(200)
  @Delete('/:id')
  // @Auth('admin')
  @Auth()
  async deleteOrder(@Param('id') orderId: number) {
    return this.orderService.deleteOrder(orderId);
  }
}
