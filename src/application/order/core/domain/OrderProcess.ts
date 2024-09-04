import { OrderItem } from './OrderItems';
import { OrderStatus } from './OrderStatus';

export class OrderProcess {
  items?: OrderItem[];
  customerId: number;
  total: number;
  status: OrderStatus;
}
