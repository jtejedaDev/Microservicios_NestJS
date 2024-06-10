import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { OrdersService } from './orders/orders.service';


@Module({
  imports: [OrdersModule],
  controllers: [],
  providers: [OrdersService],
})
export class AppModule {}
