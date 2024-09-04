import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './custumer/custumer.module';
import { CategoryModule } from 'src/drivers/category/category.module';
import { ProductModule } from 'src/drivers/product/product.module';

@Module({
  imports: [CustomerModule, CategoryModule, ProductModule, OrderModule],
})
export class AdaptersModule {}
