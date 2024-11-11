import { PaymentDTO } from 'src/adapters/payment/dto/PaymentDto';
import { Payment } from '../entities/Payment';

export abstract class IPaymentData {
  abstract createPayment(Payment: Payment): Promise<Payment>;
  abstract convertPaymentDtoToEntity(dto: PaymentDTO): Payment;
}
