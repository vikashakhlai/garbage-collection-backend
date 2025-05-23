import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { FileModule } from './file/file.module';
import { OrderModule } from './order/order.module';
import { ServiceModule } from './service/service.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, ServiceModule, OrderModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
