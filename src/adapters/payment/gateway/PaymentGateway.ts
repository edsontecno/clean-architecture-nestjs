import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PaymentDTO } from '../dto/PaymentDto';
import { OrderEntity } from 'src/adapters/order/gateway/Order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { getEnumFromString } from 'src/application/order/entities/OrderStatus';

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