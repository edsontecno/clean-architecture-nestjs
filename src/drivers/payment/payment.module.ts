import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/adapters/order/gateway/Order.entity';
import { PaymentAdapterController } from 'src/adapters/payment/controller/PaymentAdaptercontroller';
import { PaymentEntity } from 'src/adapters/payment/gateway/Payment.entity';
import { PaymentPresenter } from 'src/adapters/payment/presenter/PaymentPresenter';
import { IPaymentUseCase } from 'src/application/payment/interfaces/IPaymentUseCases';
import { PaymentUseCase } from 'src/application/payment/useCases/PaymentUseCase';
import { CustomerModule } from '../customer/customer.module';
import { OrderModule } from '../order/order.module';
import { ProductModule } from '../product/product.module';
import { PaymentController } from './payment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity, OrderEntity]),
    ProductModule,
    CustomerModule,
    OrderModule,
  ],
  controllers: [PaymentController],
  providers: [
    PaymentAdapterController,
    PaymentPresenter,
    {
      provide: IPaymentUseCase,
      useClass: PaymentUseCase,
    },
    PaymentUseCase,
  ],
  exports: [IPaymentUseCase],
})
export class PaymentModule {}
