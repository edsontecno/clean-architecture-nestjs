import { Injectable } from '@nestjs/common';
import { IPaymentUseCase } from '../interfaces/IPaymentUseCases';
import { IPaymentData } from '../interfaces/IPaymentData';
import { Payment } from '../entities/Payment';
import { MercadoPagoGateway } from '../../../adapters/payment/gateway/MercadoPagoGateway';


// @Injectable()
export class PaymentUseCase implements IPaymentUseCase {
    constructor(private readonly mercadoPagoGateway: MercadoPagoGateway) {
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
      
        // const response = await this.mercadoPagoGateway.createPayment(preference);
      
        // Suponha que você queira retornar o objeto `payment` com o campo `init_point` (ou modifique conforme necessário)
        return {
          ...payment
        };
      }
      
  }