import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './Customer.entity';
import { Customer } from 'src/application/custumer/entities/Customer';
import { ICustomerData } from 'src/application/custumer/interfaces/ICustomerData';
import { CustomerDTO } from '../dto/CustomerDto';

export class CustomerGateway implements ICustomerData {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly usuarioRepository: Repository<CustomerEntity>,
  ) {}

  async saveCustomer(customer: Customer): Promise<void> {
    const customerEntity = this.convertEntityToData(customer);
    await this.usuarioRepository.save(customerEntity);
  }

  async getCustomerByCpf(cpf: string): Promise<Customer> {
    const customer = await this.findOne(cpf);
    const result = this.convertDataToEntity(customer);
    return result;
  }

  private async findOne(cpf: string) {
    return await this.usuarioRepository.findOne({
      where: {
        cpf,
      },
      relations: ['orders'],
    });
  }

  async deleteCustomer(cpf: string): Promise<void> {
    const customer = await this.findOne(cpf);
    this.usuarioRepository.delete(customer.id);
  }

  async updateCustomer(customer: Customer): Promise<Customer> {
    const entity = await this.findOne(customer.cpf);
    Object.assign(entity, customer);

    await this.usuarioRepository.save(entity);
    return customer;
  }

  private convertEntityToData(customer: Customer) {
    const customerEntity = new CustomerEntity();
    Object.assign(customerEntity, customer);
    return customerEntity;
  }

  private convertDataToEntity(customer: CustomerEntity) {
    const result = new Customer();
    Object.assign(result, customer);
    return result;
  }

  convertCustomerDtoToEntity(dto: CustomerDTO): Customer {
    const customer = new Customer();
    Object.assign(customer, dto);
    return customer;
  }
}
