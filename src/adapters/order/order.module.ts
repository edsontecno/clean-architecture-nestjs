import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/drivers/category/category.module';
import { CustomerModule } from 'src/drivers/customer/custumer.module';
import { ProductModule } from 'src/drivers/product/product.module';
import { CategoryEntity } from '../category/gateway/Category.entity';
import { CustomerEntity } from '../custumer/gateway/Customer.entity';
import { ProductEntity } from '../product/gateway/Product.entity';
import { OrderInput } from './input';
import { OrderController } from './input/order.controller';
import { OrderOutput } from './output';
import { OrderEntity } from './output/Order.entity';
import { OrderItemEntity } from './output/OrderItem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemEntity,
      ProductEntity,
      CustomerEntity,
      CategoryEntity,
    ]),
    CategoryModule,
    CustomerModule,
    ProductModule,
  ],
  controllers: [OrderController],
  providers: [
    ...OrderOutput,
    ...OrderInput,
    // {
    //   provide: IProductUseCase,
    //   useClass: ProductUseCase,
    // },
    // {
    //   provide: IProductData,
    //   useClass: ProductGateway,
    // },
    // {
    //   provide: ICustomerUseCase,
    //   useClass: CustomerUseCase,
    // },
    // {
    //   provide: ICustomerData,
    //   useClass: CustomerGateway,
    // },
    // {
    //   provide: CustomerServicePort,
    //   useClass: CustomerService,
    // },
    // {
    //   provide: CustomerPersistPort,
    //   useClass: CustomerGateway,
    // },
    // {
    //   provide: ICategoryUseCase,
    //   useClass: CategoryUseCase,
    // },
    // {
    //   provide: ICategoryData,
    //   useClass: CategoryGateway,
    // },
  ],
  exports: [...OrderOutput, ...OrderInput],
})
export class OrderModule {}
