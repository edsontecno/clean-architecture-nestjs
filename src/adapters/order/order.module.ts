import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderInput } from './input';
import { OrderController } from './input/order.controller';
import { OrderOutput } from './output';
import { OrderEntity } from './output/Order.entity';
import { ProductServicePort } from 'src/application/product/ports/input/ProductServicePort';
import { ProductService } from 'src/application/product/core/service/ProductService';
import { ProductPersistPort } from 'src/application/product/ports/output/ProductPersistPort';
import { CategoryPersistAdapter } from '../category/output/CategoryPersitAdapter';
import { CategoryEntity } from '../category/output/Category.entity';
import { CategoryServicePort } from 'src/application/category/ports/input/CategoryServicePort';
import { CategoryService } from 'src/application/category/core/service/CategoryService';
import { CategoryPersistPort } from 'src/application/category/ports/output/CategoryPersistPort';
import { CustomerEntity } from '../custumer/output/Customer.entity';
import { CustomerServicePort } from 'src/application/custumer/ports/input/CustomerServicePort';
import { CustomerService } from 'src/application/custumer/core/service/CustomerService';
import { CustomerPersistPort } from 'src/application/custumer/ports/output/CustomerPersistPort';
import { CustomerPersistAdapter } from '../custumer/output/CustomerPersitAdapter';
import { OrderItemEntity } from './output/OrderItem.entity';
import { ProductEntity } from '../product/output/Product.entity';
import { ProductPersistAdapter } from '../product/output/ProductPersitAdapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemEntity,
      ProductEntity,
      CustomerEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [
    ...OrderOutput,
    ...OrderInput,
    {
      provide: ProductServicePort,
      useClass: ProductService,
    },
    {
      provide: ProductPersistPort,
      useClass: ProductPersistAdapter,
    },
    {
      provide: CustomerServicePort,
      useClass: CustomerService,
    },
    {
      provide: CustomerPersistPort,
      useClass: CustomerPersistAdapter,
    },
    {
      provide: CategoryServicePort,
      useClass: CategoryService,
    },
    {
      provide: CategoryPersistPort,
      useClass: CategoryPersistAdapter,
    },
  ],
  exports: [...OrderOutput, ...OrderInput],
})
export class OrderModule {}
