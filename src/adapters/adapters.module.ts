import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './custumer/custumer.module';

@Module({
  imports: [CustomerModule, CategoryModule, ProductModule, OrderModule],
})
export class AdaptersModule {}
