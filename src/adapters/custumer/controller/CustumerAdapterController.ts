import { Injectable } from '@nestjs/common';
import { CustomerDTO } from '../dto/CustomerDto';
import { CustomerPresenter } from '../presenter/CustomerPresenter';
import { ICustomerUseCase } from 'src/application/customer/interfaces/ICustomerUseCase';
import { ICustomerData } from 'src/application/customer/interfaces/ICustomerData';

@Injectable()
export class CustomerAdapterController {
  constructor(
    private readonly useCase: ICustomerUseCase,
    private gateway: ICustomerData,
    private presenter: CustomerPresenter,
  ) {}

  async saveCustomer(dadosDoUsuario: CustomerDTO): Promise<CustomerDTO> {
    const customer = this.gateway.convertCustomerDtoToEntity(dadosDoUsuario);
    const entity = await this.useCase.saveCustomer(customer);
    return this.presenter.convertEntityToResponseDto(entity);
  }

  async getCustomer(cpf: string): Promise<CustomerDTO> {
    const entity = await this.useCase.getCustomer(cpf);
    return this.presenter.convertEntityToResponseDto(entity);
  }

  async deleteCustomer(cpf: string) {
    return await this.useCase.deleteCustomer(cpf);
  }

  async updateCustomer(
    cpf: string,
    dadosDoUsuario: CustomerDTO,
  ): Promise<CustomerDTO> {
    const customer = this.gateway.convertCustomerDtoToEntity(dadosDoUsuario);
    const entity = await this.useCase.updateCustomer(cpf, customer);
    return this.presenter.convertEntityToResponseDto(entity);
  }
}
