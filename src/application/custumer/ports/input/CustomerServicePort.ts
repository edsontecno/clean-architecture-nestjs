import { Customer } from '../../core/domain/Customer';

export abstract class CustomerServicePort {
  abstract saveCustomer(customer: Customer): Promise<void>;
  abstract getCustomer(cpf: string): Promise<Customer>;
  abstract deleteCustomer(cpf: string): Promise<void>;
  abstract updateCustomer(cpf: string, customer: Customer): Promise<Customer>;
}
