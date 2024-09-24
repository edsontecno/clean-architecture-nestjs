import { Payment } from '../entities/Payment';

export abstract class IPaymentUseCase {
  abstract createPayment(price: Payment): Promise<Payment>;
}