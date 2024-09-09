import { Injectable } from '@nestjs/common';
import { ICustomerData } from 'src/application/custumer/interfaces/ICustomerData';
import { ICustomerUseCase } from 'src/application/custumer/interfaces/ICustomerUseCase';
import { CustomerDTO } from '../dto/CustomerDto';

@Injectable()
export class CustumerAdapterController {
  constructor(
    private readonly useCase: ICustomerUseCase,
    private gateway: ICustomerData,
  ) {}

  async saveCustomer(dadosDoUsuario: CustomerDTO) {
    const customer = this.gateway.convertCustomerDtoToEntity(dadosDoUsuario);
    await this.useCase.saveCustomer(customer);
  }

  async getCustomer(cpf: string) {
    return await this.useCase.getCustomer(cpf);
  }

  async deleteCustomer(cpf: string) {
    return await this.useCase.deleteCustomer(cpf);
  }

  async updateCustomer(cpf: string, dadosDoUsuario: CustomerDTO) {
    const customer = this.gateway.convertCustomerDtoToEntity(dadosDoUsuario);
    return await this.useCase.updateCustomer(cpf, customer);
  }
}
