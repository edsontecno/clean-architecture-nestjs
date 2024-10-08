import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/adapters/order/gateway/Order.entity';
import { getEnumFromString } from 'src/application/order/entities/OrderStatus';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentGateway {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repository: Repository<OrderEntity>,
  ) {}

  async updateStatusPayment(payment_id: number, status: string) {
    status = getEnumFromString(status);
    return await this.repository.update({ payment_id }, { status });
  }
}
