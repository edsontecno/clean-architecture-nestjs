import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAdapterController } from 'src/adapters/custumer/controller/CustumerAdapterController';
import { CustomerEntity } from 'src/adapters/custumer/gateway/Customer.entity';
import { CustomerGateway } from 'src/adapters/custumer/gateway/CustomerGateway';
import { CustomerPresenter } from 'src/adapters/custumer/presenter/CustomerPresenter';
import { ICustomerData } from 'src/application/customer/interfaces/ICustomerData';
import { ICustomerUseCase } from 'src/application/customer/interfaces/ICustomerUseCase';
import { CustomerUseCase } from 'src/application/customer/useCases/CustomerUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [],
  providers: [
    {
      provide: CustomerAdapterController,
      useClass: CustomerAdapterController,
    },
    {
      provide: CustomerPresenter,
      useClass: CustomerPresenter,
    },
    {
      provide: ICustomerUseCase,
      useClass: CustomerUseCase,
    },
    {
      provide: ICustomerData,
      useClass: CustomerGateway,
    },
  ],
  exports: [
    {
      provide: ICustomerUseCase,
      useClass: CustomerUseCase,
    },
    {
      provide: ICustomerData,
      useClass: CustomerGateway,
    },
  ],
  // exports: [...Services, ...ServicesOutput],
})
export class CustomerModule {}
