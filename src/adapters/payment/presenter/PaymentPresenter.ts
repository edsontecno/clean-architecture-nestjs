import { Injectable } from '@nestjs/common';
import { PaymentDTO } from '../dto/PaymentDto';
import { Payment } from 'src/application/Payment/entities/Payment';

@Injectable()
export class PaymentPresenter {
  convertEntityToResponseDto(entity: Payment): PaymentDTO {
    const response = new PaymentDTO();
    response.price = entity.price;
    response.description = entity.description;
    return response;
  }
}