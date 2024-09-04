import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './Order.entity';
import { OrderItemEntity } from './OrderItem.entity';
import { OrderStatus } from 'src/application/order/core/domain/OrderStatus';
import { Order } from 'src/application/order/core/domain/Order';
import { CustomerEntity } from 'src/adapters/custumer/output/Customer.entity';
import { OrderProcess } from 'src/application/order/core/domain/OrderProcess';
import { OrderPersistPort } from 'src/application/order/ports/output/OrderPersistPort';
import { ProductEntity } from 'src/adapters/product/output/Product.entity';

export class OrderPersistAdapter implements OrderPersistPort {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repository: Repository<OrderEntity>,
  ) {}

  async save(order: OrderProcess): Promise<number> {
    const entity = new OrderEntity();
    entity.customer = new CustomerEntity();
    entity.customer.id = order.customerId;
    entity.itemsOrder = [];
    order.items.forEach((element) => {
      const itemOrder = new OrderItemEntity();
      itemOrder.product = new ProductEntity();
      itemOrder.product.id = element.productId;
      itemOrder.quantidade = element.amount;
      itemOrder.precoVenda = element.salePrice;
      entity.itemsOrder.push(itemOrder);
    });
    Object.assign(entity, order);

    await this.repository.save(entity);
    return entity.id;
  }

  async changeOrderStatus(id: number, status: OrderStatus) {
    const order = await this.repository.findOneBy({ id });
    order.status = status;
    await this.repository.save(order);
  }

  async getAllByStatus(status: OrderStatus): Promise<Order[]> {
    const ordersEntity = await this.repository.find({
      where: { status },
      relations: ['itemsOrder', 'customer', 'itemsOrder.product'],
    });
    const orders = [];
    for (const entity of ordersEntity) {
      const newOrder = new Order();
      Object.assign(newOrder, entity);
      orders.push(newOrder);
    }
    return orders;
  }
  async changeStatus(id: number, status: OrderStatus) {
    const order = await this.repository.findOneBy({ id });
    order.status = status;
    await this.repository.save(order);
    return '';
  }

  async getOrdersByCustomer(cpf: string): Promise<Order[]> {
    const ordersEntity = await this.repository.find({
      where: {
        customer: {
          cpf,
        },
      },
      relations: ['itemsOrder', 'customer', 'itemsOrder.product'],
    });
    const orders: Order[] = [];
    for (const item of ordersEntity) {
      const newOrder = new Order();
      Object.assign(newOrder, item);
      orders.push(newOrder);
    }
    return orders;
  }

  async get(id: number): Promise<Order> {
    const entity = await this.repository.findOneBy({ id });
    const order = new Order();
    Object.assign(order, entity);
    return order;
  }
}
