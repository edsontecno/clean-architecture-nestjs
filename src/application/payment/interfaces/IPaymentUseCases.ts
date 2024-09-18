import { Payment } from '../entities/Payment';

export abstract class IPaymentUseCase {
  abstract createPayment(payment: Payment): Promise<Payment>;
}