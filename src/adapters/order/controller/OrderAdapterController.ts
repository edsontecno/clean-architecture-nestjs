import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/adapters/order/dto/create-order.dto';
import { IOrderData } from 'src/application/order/interfaces/IOrderData';
import { IOrderUseCase } from 'src/application/order/interfaces/IOrderUseCase';
import { OrderPresenter } from '../presenter/OrderPresenter';

@Injectable()
export class OrderAdapterController {
  constructor(
    private readonly useCase: IOrderUseCase,
    private gateway: IOrderData,
    private presenter: OrderPresenter,
  ) {}

  async save(orderDto: CreateOrderDto) {
    const order = this.gateway.convertDtoToEntity(orderDto);
    return await this.useCase.save(order);
  }

  async getAllByStatus(status: string) {
    const orders = await this.useCase.getAllByStatus(status);
    return this.presenter.convertArrayEntityToArrayResponseDto(orders);
  }

  async getOrderByCustomer(cpf: string) {
    const orders = await this.useCase.getOrderByCustomer(cpf);
    return this.presenter.convertArrayEntityToArrayResponseDto(orders);
  }

  async changeStatus(id: string, status: string) {
    return await this.useCase.changeStatus(id, status);
  }

  async getListStatus() {
    return await this.useCase.getListStatus();
  }

  async getById(id: number) {
    const order = await this.useCase.getById(id);
    return this.presenter.convertEntityToResponseDto(order);
  }

  async findStatusOrder(id: number) {
    const order = await this.useCase.getById(id);
    return order.status;
  }

  async getOrders() {
    const orders = await this.useCase.getOrders();
    return this.presenter.convertArrayEntityToArrayResponseDto(orders);
  }
}
