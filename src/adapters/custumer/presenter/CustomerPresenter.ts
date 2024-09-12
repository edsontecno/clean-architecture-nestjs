import { Injectable } from '@nestjs/common';
import { CustomerDTO } from '../dto/CustomerDto';
import { Customer } from 'src/application/customer/entities/Customer';

@Injectable()
export class CustomerPresenter {
  convertEntityToResponseDto(entity: Customer): CustomerDTO {
    const response = new CustomerDTO();
    response.cpf = entity.cpf;
    response.email = entity.email;
    response.name = entity.name;
    return response;
  }
}
