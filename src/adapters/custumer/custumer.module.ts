import { Module } from '@nestjs/common';
import { CustomerController } from './input/custumer.controller';
import { Services } from './input';
import { ServicesOutput } from './output';
import { CustomerEntity } from './output/Customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [...Services, ...ServicesOutput],
  exports: [...Services, ...ServicesOutput],
})
export class CustomerModule {}
