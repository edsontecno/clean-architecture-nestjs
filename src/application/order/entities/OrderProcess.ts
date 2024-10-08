import { OrderItem } from './OrderItems';
import { OrderStatus } from './OrderStatus';

export class OrderProcess {
  items?: OrderItem[];
  customerId: number;
  total: number;
  status: OrderStatus;
  payment_id: number;
  qr_code: string;

  constructor() {
    this.status = OrderStatus.Pending;
    this.total = 0;
    this.items = [];
  }
}
