import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ICustomerUseCase } from 'src/application/custumer/interfaces/ICustomerUseCase';
import { CustomerUseCase } from 'src/application/custumer/useCases/CustomerUseCase';
import { CustomerController } from './custumer.controller';
import { CustomerEntity } from 'src/adapters/custumer/gateway/Customer.entity';
import { ICustomerData } from 'src/application/custumer/interfaces/ICustomerData';
import { CustomerGateway } from 'src/adapters/custumer/gateway/CustomerGateway';
import { CustumerAdapterController } from 'src/adapters/custumer/controller/CustumerAdapterController';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [
    {
      provide: CustumerAdapterController,
      useClass: CustumerAdapterController,
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
