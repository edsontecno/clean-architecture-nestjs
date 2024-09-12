import { Injectable } from '@nestjs/common';
import { Order } from '../entities/Order';
import { BusinessRuleException } from 'src/system/filtros/business-rule-exception';
import { timeInMinutes } from 'src/application/utils/utils';
import { OrderProcess } from '../entities/OrderProcess';
import { OrderStatus } from '../entities/OrderStatus';
import { IOrderData } from '../interfaces/IOrderData';
import { IOrderUseCase } from '../interfaces/IOrderUseCase';
import { OrderItem } from '../entities/OrderItems';
import { IProductData } from 'src/application/product/interfaces/IProductData';
import { ICustomerUseCase } from 'src/application/custumer/interfaces/ICustomerUseCase';

@Injectable()
export class OrderUseCase implements IOrderUseCase {
  constructor(
    private persist: IOrderData,
    private productService: IProductData,
    private customerUseCase: ICustomerUseCase,
  ) {}

  async save(order: Order): Promise<object> {
    const orderProcess = new OrderProcess();
    if (order.customerId) {
      const customer = await this.customerUseCase.getCustomer(order.customerId);
  
      if (customer.id === undefined) {
        throw new BusinessRuleException(
          'Cliente informado não existe na base de dados',
        );
      }
      orderProcess.customerId = customer.id;
    }
  
    if (order.items.length < 1) {
      throw new BusinessRuleException(
        'Nenhum produto foi adicionado ao pedido',
      );
    }
  
    await this.prepareItems(order, orderProcess);
  
    const orderId = await this.persist.save(orderProcess);
    const qrCode = this.processPayment(orderId);
  
    return qrCode;
  }

  private async prepareItems(order: Order, orderProcessado: OrderProcess) {
    for (const element of order.items) {
      if (!element.productId) {
        throw new BusinessRuleException('Por favor informe o produto desejado');
      }

      const product = await this.productService.get(element.productId);

      if (product.id === undefined) {
        throw new BusinessRuleException(
          `O produto com id '${element.productId}' não existe na base de dados`,
        );
      }
      if (!element.amount || element.amount < 1) {
        throw new BusinessRuleException(
          'A quantidade mínima de um produto é 1',
        );
      }
      const newItem = new OrderItem();
      newItem.productId = element.productId;
      newItem.amount = element.amount;
      newItem.salePrice = parseFloat(product.price) * element.amount;
      orderProcessado.items.push(newItem);
      orderProcessado.total += newItem.salePrice;
    }
  }

  async getAllByStatus(status): Promise<Order[]> {
    this.isStatusValid(status);
    const orders = await this.persist.getAllByStatus(status);
    this.addAwaitTimeOnOrders(orders);
    return orders;
  }

  private addAwaitTimeOnOrders(orders: any) {
    orders.map(
      (order) =>
        (order.awaitTime = order.createdAt
          ? timeInMinutes(order.createdAt, new Date())
          : ''),
    );
  }

  private isStatusValid(status: any) {
    if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
      throw new BusinessRuleException('O status informado é inválido');
    }
  }

  async processPayment(orderId: number): Promise<object> {
    console.log('Processando pagamento....');
    const qrCode = await this.awaitPayment();
  
    return { order_id: orderId, qrCode }; 
  }

  awaitPayment() {
    const urlQrCode = 'https://www.mercadopago.com/instore/merchant/qr/104298854/1355be1ba3e441db806671925213e14ec595b7892e8a46268407fd4e1ab608cc.png';
    return urlQrCode;
  }

  private statusPermitidos = {
    [OrderStatus.Pending]: [OrderStatus.Received, OrderStatus.Canceled],
    [OrderStatus.Received]: [OrderStatus.InProgress, OrderStatus.Canceled],
    [OrderStatus.InProgress]: [OrderStatus.Ready, OrderStatus.Canceled],
    [OrderStatus.Ready]: [OrderStatus.Fineshed],
    [OrderStatus.Fineshed]: [],
    [OrderStatus.Canceled]: [],
  };

  checkTransactionStatus(
    statusAtual: OrderStatus,
    novoStatus: OrderStatus,
  ): boolean {
    const statusPossiveis = this.statusPermitidos[statusAtual];
    return statusPossiveis.includes(novoStatus);
  }

  async changeStatus(id: number, status: OrderStatus) {
    const order = await this.getById(id);
    if (!this.checkTransactionStatus(order.status, status)) {
      throw new BusinessRuleException('Transição de status inválida');
    }
    await this.persist.changeStatus(id, status);
    return 'Pedido alterado com sucesso';
  }

  async getById(id: number): Promise<Order> {
    return await this.persist.get(id);
  }

  async getOrderByCustomer(cpf: any): Promise<Order[]> {
    const orders = await this.persist.getOrdersByCustomer(cpf);
    this.addAwaitTimeOnOrders(orders);
    return orders;
  }

  getListStatus(): string[] {
    return Object.values(OrderStatus);
  }

  async getOrders(): Promise<Order[]> {
    const orderInProcess = [
      OrderStatus.InProgress,
      OrderStatus.Received,
      OrderStatus.Ready,
    ];
    const orders = await this.persist.getOrders(orderInProcess);
    this.addAwaitTimeOnOrders(orders);
    return orders;
  }
}
