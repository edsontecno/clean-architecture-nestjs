import { Injectable } from '@nestjs/common';
import { Customer } from 'src/application/custumer/entities/Customer';
import { ICustomerUseCase } from 'src/application/custumer/interfaces/ICustomerUseCase';
import { CustomerDTO } from 'src/drivers/customer/CustomerDto';

@Injectable()
export class CustumerAdapterController {
  constructor(private readonly useCase: ICustomerUseCase) {}

  async saveCustomer(dadosDoUsuario: CustomerDTO) {
    const customer = new Customer();
    Object.assign(customer, dadosDoUsuario);
    await this.useCase.saveCustomer(customer);
  }

  async getCustomer(cpf: string) {
    return await this.useCase.getCustomer(cpf);
  }

  async deleteCustomer(cpf: string) {
    return await this.useCase.deleteCustomer(cpf);
  }

  async updateCustomer(cpf: string, dadosDoUsuario: CustomerDTO) {
    const customer = new Customer();
    Object.assign(customer, dadosDoUsuario);

    return await this.useCase.updateCustomer(cpf, customer);
  }
}
