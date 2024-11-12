import { IOrderUseCase } from 'src/application/order/interfaces/IOrderUseCase';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentUseCase {
  constructor(private readonly orderUseCase: IOrderUseCase) {}

  private ACCESS_TOKEN_TEST =
    'TEST-2282551978833497-100320-c82d058610e7b085af78d1551645b98f-676499050';

  async handleWebhook(payment_id: number) {
    try {
      if (!payment_id) {
        return 'Webhook ativo';
      }

      const url = `https://api.mercadopago.com/v1/payments/${payment_id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.ACCESS_TOKEN_TEST}`,
          'Content-Type': 'application/json',
        },
      });
      if (
        response.data.status === 'approved' ||
        response.data.status === 'rejected'
      ) {
        await this.orderUseCase.updateStatusPayment(
          payment_id,
          response.data.status,
        );
      }

      return { pagamento: payment_id, status: response.data.status };
    } catch (error) {
      console.log(error);
    }
  }
}
