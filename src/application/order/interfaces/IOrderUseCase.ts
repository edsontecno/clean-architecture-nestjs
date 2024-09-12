import { Order } from '../entities/Order';

export abstract class IOrderUseCase {
  abstract save(order: Order): Promise<Order>;
  abstract getAllByStatus(status): Promise<Order[]>;
  abstract changeStatus(id, status): Promise<Order>;
  abstract getOrderByCustomer(cpf): Promise<Order[]>;
  abstract getListStatus(): string[];
  abstract getById(id: number): Promise<Order>;
  abstract getOrders(): Promise<Order[]>;
}
