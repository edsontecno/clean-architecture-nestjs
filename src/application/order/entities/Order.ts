'use strict';

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
  payment_id: number;
  qr_code: string;
}
