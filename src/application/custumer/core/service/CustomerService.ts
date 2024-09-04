import { Injectable } from '@nestjs/common';
import { Customer } from '../domain/Customer';
import { CustomerServicePort } from '../../ports/input/CustomerServicePort';
import { CustomerPersistPort } from '../../ports/output/CustomerPersistPort';
import { BusinessRuleException } from 'src/filtros/business-rule-exception';
import { cpf } from 'cpf-cnpj-validator';
import { Service } from 'src/application/service/service';
import { emailIsValid } from 'src/application/utils/utils';

@Injectable()
export class CustomerService extends Service implements CustomerServicePort {
  constructor(private persist: CustomerPersistPort) {
    super();
  }

  async saveCustomer(customer: Customer): Promise<void> {
    this.validarRegrasCustomer(customer);

    const customerPesquisado = await this.getCustomer(customer.cpf);

    if (customerPesquisado.id !== undefined) {
      throw new BusinessRuleException('CPF já cadastrado na base de dados');
    }

    await this.persist.saveCustomer(customer);
  }

  private validarRegrasCustomer(customer: Customer) {
    this.validField(customer.name, 'nome');
    this.validField(customer.email, 'email');

    if (!emailIsValid(customer.email)) {
      throw new BusinessRuleException('O email informado é inválido');
    }

    this.validarCpfObrigatorio(customer.cpf);

    if (!cpf.isValid(customer.cpf)) {
      throw new BusinessRuleException('CPF informado não é válido');
    }
  }

  private validarCpfObrigatorio(cpf: string) {
    this.validField(cpf, 'cpf');
  }

  getCustomer(cpf: string): Promise<Customer> {
    this.validarCpfObrigatorio(cpf);
    return this.persist.getCustomerByCpf(cpf);
  }

  async deleteCustomer(cpf: string): Promise<void> {
    this.validarCpfObrigatorio(cpf);
    const customer = await this.cpfExiste(cpf);

    if (customer.orders.length > 0) {
      throw new BusinessRuleException(
        'Não é possível deletar customers com orders vinculados',
      );
    }

    this.persist.deleteCustomer(cpf);
  }

  private async cpfExiste(cpf: string) {
    const customerPesquisado = await this.getCustomer(cpf);
    if (customerPesquisado.cpf === undefined) {
      throw new BusinessRuleException('CPF não localizado na base de dados');
    }

    return customerPesquisado;
  }

  async updateCustomer(cpf: string, customer: Customer): Promise<Customer> {
    const customerPesquisado = await this.cpfExiste(cpf);
    Object.assign(customerPesquisado, customer);
    this.validarRegrasCustomer(customerPesquisado);
    return this.persist.updateCustomer(cpf, customerPesquisado);
  }
}
