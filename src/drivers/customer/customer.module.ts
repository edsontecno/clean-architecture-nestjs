import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ICustomerData } from 'src/application/customer/interfaces/ICustomerData';
import { ICustomerUseCase } from 'src/application/customer/interfaces/ICustomerUseCase';
import { CustomerUseCase } from 'src/application/customer/useCases/CustomerUseCase';
import { CustomerController } from './customer.controller';
import { CustomerEntity } from 'src/adapters/custumer/gateway/Customer.entity';
import { CustomerAdapterController } from 'src/adapters/custumer/controller/CustumerAdapterController';
import { CustomerPresenter } from 'src/adapters/custumer/presenter/CustomerPresenter';
import { CustomerGateway } from 'src/adapters/custumer/gateway/CustomerGateway';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
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
