import { Order } from '../../core/domain/Order';

export abstract class OrderServicePort {
  abstract save(order: Order): Promise<number>;
  abstract getAllByStatus(status): Promise<Order[]>;
  abstract changeStatus(id, status): Promise<string>;
  abstract getOrderByCustomer(cpf): Promise<Order[]>;
  abstract getListStatus(): string[];
}
