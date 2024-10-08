import { Injectable } from '@nestjs/common';
import { PaymentDTO } from '../dto/PaymentDto';
import { Payment } from 'src/application/payment/entities/Payment';

@Injectable()
export class PaymentPresenter {
  convertEntityToResponseDto(entity: Payment): PaymentDTO {
    const response = new PaymentDTO();
    response.amount = entity.amount;
    return response;
  }
}