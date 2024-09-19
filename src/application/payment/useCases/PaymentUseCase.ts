import { Injectable } from '@nestjs/common';
import { IPaymentUseCase } from '../interfaces/IPaymentUseCases';
import { IPaymentData } from '../interfaces/IPaymentData';
import { Payment } from '../entities/Payment';
import { PaymentGateway } from '../../../adapters/payment/gateway/PaymentGateway';


@Injectable()
export class PaymentUseCase implements IPaymentUseCase {
    constructor(private readonly PaymentGateway: PaymentGateway) {
    }
  
    async createPayment(payment: Payment): Promise<Payment> {
        const preference = {
          items: [
            {
              title: payment.description,
              quantity: '1',
              currency_id: 'BRL',
              unit_price: payment.price,
            },
          ],
          auto_return: 'approved',
          notification_url: process.env.WEBHOOK_URL,
        };
      
        // const response = await this.PaymentGateway.createPayment(preference);
      
        return {
          ...payment
        };
      }
      
  }