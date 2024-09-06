import { OrderProcess } from '../entities/OrderProcess';
import { Order } from '../entities/Order';
import { OrderStatus } from '../entities/OrderStatus';

export abstract class IOrderData {
  abstract save(order: OrderProcess): Promise<number>;
  abstract changeOrderStatus(id: number, status: OrderStatus);
  abstract getAllByStatus(status: OrderStatus);
  abstract changeStatus(id: number, status: OrderStatus): Promise<string>;
  abstract getOrdersByCustomer(cpf: string): Promise<Order[]>;
  abstract get(id: number): Promise<Order>;
  abstract getOrders(status: OrderStatus[]): Promise<Order[]>;
}
