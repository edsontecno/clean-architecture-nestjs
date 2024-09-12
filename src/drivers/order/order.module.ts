import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderAdapterController } from 'src/adapters/order/controller/OrderAdapterController';
import { OrderGateway } from 'src/adapters/order/gateway/OrderGateway';
import { IOrderData } from 'src/application/order/interfaces/IOrderData';
import { IOrderUseCase } from 'src/application/order/interfaces/IOrderUseCase';
import { OrderUseCase } from 'src/application/order/useCases/OrderUseCase';
import { CategoryModule } from 'src/drivers/category/category.module';
import { ProductModule } from 'src/drivers/product/product.module';
import { CategoryEntity } from '../../adapters/category/gateway/Category.entity';
import { OrderEntity } from '../../adapters/order/gateway/Order.entity';
import { OrderItemEntity } from '../../adapters/order/gateway/OrderItem.entity';
import { ProductEntity } from '../../adapters/product/gateway/Product.entity';
import { OrderController } from './order.controller';
import { OrderPresenter } from 'src/adapters/order/presenter/OrderPresenter';
import { CustomerEntity } from 'src/adapters/custumer/gateway/Customer.entity';
import { CustomerModule } from '../customer/customer.module';

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
    {
      provide: OrderPresenter,
      useClass: OrderPresenter,
    },
    {
      provide: OrderAdapterController,
      useClass: OrderAdapterController,
    },
    {
      provide: IOrderData,
      useClass: OrderGateway,
    },
    {
      provide: IOrderUseCase,
      useClass: OrderUseCase,
    },
    // ...OrderOutput,
    // ...OrderInput,
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
  exports: [
    {
      provide: IOrderData,
      useClass: OrderGateway,
    },
    {
      provide: IOrderUseCase,
      useClass: OrderUseCase,
    },
  ],
})
export class OrderModule {}
