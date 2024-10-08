import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IPaymentData } from 'src/application/payment/interfaces/IPaymentData';
import { IPaymentUseCase } from 'src/application/payment/interfaces/IPaymentUseCases';
import { PaymentUseCase } from 'src/application/payment/useCases/PaymentUseCase';
import { PaymentController } from './payment.controller';
import { PaymentGateway } from 'src/adapters/payment/gateway/PaymentGateway';
import { PaymentEntity } from 'src/adapters/payment/gateway/Payment.entity';
import { PaymentAdapterController } from 'src/adapters/payment/controller/PaymentAdaptercontroller';
import { PaymentPresenter } from 'src/adapters/payment/presenter/PaymentPresenter';
import { OrderEntity } from 'src/adapters/order/gateway/Order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity, OrderEntity])],
  controllers: [PaymentController],
  providers: [
    PaymentAdapterController,
    PaymentPresenter,
    {
      provide: IPaymentUseCase,
      useClass: PaymentUseCase,
    },
    {
      provide: IPaymentData,
      useClass: PaymentGateway,
    },
    PaymentGateway,
    PaymentUseCase,
  ],
  exports: [
    IPaymentUseCase,
    IPaymentData,
  ],
})
export class PaymentModule {}
