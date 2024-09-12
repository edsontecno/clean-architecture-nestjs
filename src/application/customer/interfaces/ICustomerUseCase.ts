import { Customer } from '../entities/Customer';

export abstract class ICustomerUseCase {
  abstract saveCustomer(customer: Customer): Promise<Customer>;
  abstract getCustomer(cpf: string): Promise<Customer>;
  abstract deleteCustomer(cpf: string): Promise<void>;
  abstract updateCustomer(cpf: string, customer: Customer): Promise<Customer>;
}
