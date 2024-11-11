'use strict';

import { Payment } from 'src/application/payment/entities/Payment';
import { OrderItem } from './OrderItems';
import { OrderStatus } from './OrderStatus';

export class Order {
  id: number;
  total: number;
  items: OrderItem[];
  customerId: string;
  status: OrderStatus;
  awaitTime: string;
  createdAt: string;
  payment: Payment;
  // payment_id: number;
  // qr_code: string;
}
