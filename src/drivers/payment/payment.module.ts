import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { IPaymentData } from 'src/application/payment/interfaces/IPaymentData';
import { IPaymentUseCase } from 'src/application/payment/interfaces/IPaymentUseCases';
import { PaymentUseCase } from 'src/application/payment/useCases/PaymentUseCase';
import { PaymentController } from './payment.controller';
// import { PaymentEntity } from 'src/adapters/payment/gateway/Payment.entity';
import { PaymentAdapterController } from 'src/adapters/payment/controller/PaymentAdaptercontroller';
import { PaymentPresenter } from 'src/adapters/payment/presenter/PaymentPresenter';
import { PaymentGateway } from 'src/adapters/payment/gateway/PaymentGateway';

@Module({
  controllers: [PaymentController],
  providers: [
    {
      provide: PaymentAdapterController,
      useClass: PaymentAdapterController,
    },
    {
      provide: PaymentPresenter,
      useClass: PaymentPresenter,
    },
    {
      provide: PaymentUseCase,
      useClass: PaymentUseCase,
    },
    {
      provide: IPaymentData,
      useClass: PaymentGateway,
    },
  ],
  exports: [
    {
      provide: IPaymentUseCase,
      useClass: PaymentUseCase,
    },
    {
      provide: IPaymentData,
      useClass: PaymentGateway,
    },
  ]
})
export class PaymentModule {}