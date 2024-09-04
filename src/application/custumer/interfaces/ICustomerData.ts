import { Customer } from '../entities/Customer';

export abstract class ICustomerData {
  abstract saveCustomer(customer: Customer): Promise<void>;
  abstract getCustomerByCpf(cpf: string): Promise<Customer>;
  abstract deleteCustomer(cpf: string): Promise<void>;
  abstract updateCustomer(cpf: string, customer: Customer): Promise<Customer>;
}
