import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderInput } from './input';
import { OrderController } from './input/order.controller';
import { OrderOutput } from './output';
import { OrderEntity } from './output/Order.entity';
import { IProductUseCase } from 'src/application/product/interfaces/IProductUseCase';
import { ProductUseCase } from 'src/application/product/useCases/ProductUseCase';
import { IProductData } from 'src/application/product/interfaces/IProductData';
import { ICategoryUseCase } from 'src/application/category/interfaces/ICategoryUseCase';
import { CategoryUseCase } from 'src/application/category/useCases/CategoryUseCase';
import { CustomerEntity } from '../custumer/output/Customer.entity';
import { CustomerServicePort } from 'src/application/custumer/ports/input/CustomerServicePort';
import { CustomerService } from 'src/application/custumer/core/service/CustomerService';
import { CustomerPersistPort } from 'src/application/custumer/ports/output/CustomerPersistPort';
import { CustomerPersistAdapter } from '../custumer/output/CustomerPersitAdapter';
import { OrderItemEntity } from './output/OrderItem.entity';
import { ProductEntity } from '../product/gateway/Product.entity';
import { ProductGateway } from '../product/gateway/ProductGateway';
import { CategoryEntity } from '../category/gateway/Category.entity';
import { ICategoryData } from 'src/application/category/interfaces/ICategoryData';
import { CategoryGateway } from '../category/gateway/CategoryGateway';

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
      provide: IProductUseCase,
      useClass: ProductUseCase,
    },
    {
      provide: IProductData,
      useClass: ProductGateway,
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
      provide: ICategoryUseCase,
      useClass: CategoryUseCase,
    },
    {
      provide: ICategoryData,
      useClass: CategoryGateway,
    },
  ],
  exports: [...OrderOutput, ...OrderInput],
})
export class OrderModule {}
