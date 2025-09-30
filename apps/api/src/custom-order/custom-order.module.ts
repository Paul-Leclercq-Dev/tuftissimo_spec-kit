import { Module } from '@nestjs/common';
import { CustomOrderController } from './custom-order.controller';
import { CustomOrderService } from './custom-order.service';

@Module({
  controllers: [CustomOrderController],
  providers: [CustomOrderService],
})
export class CustomOrderModule {}
