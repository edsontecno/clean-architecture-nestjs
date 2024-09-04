import { OrderProcess } from '../../core/domain/OrderProcess';
import { Order } from '../../core/domain/Order';
import { OrderStatus } from '../../core/domain/OrderStatus';

export abstract class OrderPersistPort {
  abstract save(order: OrderProcess): Promise<number>;
  abstract changeOrderStatus(id: number, status: OrderStatus);
  abstract getAllByStatus(status: OrderStatus);
  abstract changeStatus(id: number, status: OrderStatus): Promise<string>;
  abstract getOrdersByCustomer(cpf: string): Promise<Order[]>;
  abstract get(id: number): Promise<Order>;
}
