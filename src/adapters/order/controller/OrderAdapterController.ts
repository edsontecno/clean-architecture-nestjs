import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/adapters/order/dto/create-order.dto';
import { IOrderData } from 'src/application/order/interfaces/IOrderData';
import { IOrderUseCase } from 'src/application/order/interfaces/IOrderUseCase';

@Injectable()
export class OrderAdapterController {
  constructor(
    private readonly useCase: IOrderUseCase,
    private gateway: IOrderData,
  ) {}

  async save(orderDto: CreateOrderDto) {
    const order = this.gateway.convertDtoToEntity(orderDto);
    return await this.useCase.save(order);
  }

  getAllByStatus(status: string) {
    return this.useCase.getAllByStatus(status);
  }

  getOrderByCustomer(cpf: string) {
    return this.useCase.getOrderByCustomer(cpf);
  }

  async changeStatus(id: string, status: string) {
    return await this.useCase.changeStatus(id, status);
  }

  async getListStatus() {
    return await this.useCase.getListStatus();
  }

  async getById(id: number) {
    return await this.useCase.getById(id);
  }

  async findStatusOrder(id: number) {
    const order = await this.useCase.getById(id);
    return order.status;
  }

  async getOrders() {
    const orders = await this.useCase.getOrders();
    return orders;
  }
}
