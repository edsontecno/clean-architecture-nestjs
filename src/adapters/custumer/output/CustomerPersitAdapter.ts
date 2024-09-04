import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './Customer.entity';
import { CustomerPersistPort } from 'src/application/custumer/ports/output/CustomerPersistPort';
import { Customer } from 'src/application/custumer/core/domain/Customer';

export class CustomerPersistAdapter implements CustomerPersistPort {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly usuarioRepository: Repository<CustomerEntity>,
  ) {}

  async saveCustomer(customer: Customer): Promise<void> {
    const customerEntity = new CustomerEntity();
    Object.assign(customerEntity, customer);
    await this.usuarioRepository.save(customerEntity);
  }

  async getCustomerByCpf(cpf: string): Promise<Customer> {
    const customer = await this.usuarioRepository.findOne({
      where: {
        cpf,
      },
      relations: ['orders'],
    });
    const result = new Customer();
    Object.assign(result, customer);
    return result;
  }

  async deleteCustomer(cpf: string): Promise<void> {
    const customer = await this.getCustomerByCpf(cpf);
    this.usuarioRepository.delete(customer.id);
  }

  async updateCustomer(cpf: string, customer: Customer): Promise<Customer> {
    const customerEntity = await this.getCustomerByCpf(cpf);
    const entity = new CustomerEntity();
    Object.assign(entity, customer);
    entity.id = customerEntity.id;

    await this.usuarioRepository.save(entity);
    return customer;
  }
}
