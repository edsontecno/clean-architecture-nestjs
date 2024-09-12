import { Module } from '@nestjs/common';
import { OrderModule } from '../drivers/order/order.module';
import { CategoryModule } from 'src/drivers/category/category.module';
import { ProductModule } from 'src/drivers/product/product.module';
import { CustomerModule } from 'src/drivers/customer/customer.module';

@Module({
  imports: [CustomerModule, CategoryModule, ProductModule, OrderModule],
})
export class AdaptersModule {}
