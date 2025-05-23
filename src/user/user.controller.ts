import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { createLicenseDto } from 'src/dto/user.dto';
import { User } from './decorators/user.decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // @Auth('admin')
  @Auth()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UsePipes(new ValidationPipe())
  @Get('profile')
  @Auth()
  async getProfile(@User('id') id: number) {
    return this.userService.getUserById(id);
  }

  @UsePipes(new ValidationPipe())
  @Put('license')
  @Auth()
  // @Auth('admin')
  async createLicense(
    @Body() dto: createLicenseDto,
    @User('id') userId: number
  ) {
    return this.userService.createLicense(dto, userId);
  }

  @UsePipes(new ValidationPipe())
  @Patch('confirm-driver/:id')
  // @Auth('admin')
  @Auth()
  async confirmDrive(@Param('id') userId: number) {
    return this.userService.confirmDriver(userId);
  }

  @UsePipes(new ValidationPipe())
  @Patch('unconfirm-driver/:id')
  // @Auth('admin')
  @Auth()
  async unConfirmDrive(@Param('id') userId: number) {
    return this.userService.unConfirmDriver(userId);
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @Auth()
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
