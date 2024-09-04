'use strict';

import { OrderItem } from './OrderItems';
import { OrderStatus } from './OrderStatus';

export class Order {
  items: [OrderItem];
  customerId: string;
  status: OrderStatus;
  awaitTime: string;
}
