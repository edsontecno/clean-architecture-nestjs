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
import { ICustomerUseCase } from 'src/application/customer/interfaces/ICustomerUseCase';
import { MercadoPagoConfig, Payment } from 'mercadopago';

@Injectable()
export class OrderUseCase implements IOrderUseCase {
  constructor(
    private persist: IOrderData,
    private productService: IProductData,
    private customerUseCase: ICustomerUseCase,
  ) {}

  async save(order: Order): Promise<Order> {
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

    const orderSaved = await this.persist.save(orderProcess);
    this.processPayment(orderSaved.id);

    return orderSaved;
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
      newItem.salePrice = parseFloat(product.price.toString()) * element.amount;
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

  async processPayment(orderId: number) {
    console.log('Processando pagamento....');
    await this.awaitPayment(orderId);
    console.log('Pagamento processado');
    this.persist.changeStatus(orderId, OrderStatus.Received);
  }

  async awaitPayment(amount) {    
    const client = new MercadoPagoConfig({ accessToken: 'TEST-2282551978833497-100320-c82d058610e7b085af78d1551645b98f-676499050' });
    const payment = new Payment(client);
    const body = {
      transaction_amount: 10,
      description: 'Compra no PIX',
      payment_method_id: 'pix',
      notification_url: 'https://3b90-2804-14c-d3-81b1-6836-58e5-e666-92ff.ngrok-free.app/webhook',
      payer: {
        email: 'gabriel.f.lazari@gmail.com'
      },
    };
    const { point_of_interaction: { transaction_data: { qr_code } }, id } = await payment.create({ body });
    return { payment_id: id, qr_code: qr_code };
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

  async changeStatus(id: number, status: OrderStatus): Promise<Order> {
    const order = await this.getById(id);
    if (!this.checkTransactionStatus(order.status, status)) {
      throw new BusinessRuleException('Transição de status inválida');
    }
    return await this.persist.changeStatus(id, status);
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
