import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { AdminController } from './admin/admin.controller';
import { CustomOrderModule } from './custom-order/custom-order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ProductsModule, OrdersModule, AuthModule, ContactModule, CustomOrderModule, UserModule],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule {}
