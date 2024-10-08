import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentUseCase {
  private ACCESS_TOKEN_TEST =
    'TEST-2282551978833497-100320-c82d058610e7b085af78d1551645b98f-676499050';

  async handleWebhook(payment_id: number) {
    try {
      const url = `https://api.mercadopago.com/v1/payments/${payment_id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.ACCESS_TOKEN_TEST}`,
          'Content-Type': 'application/json',
        },
      });

      return { status: response.data.status };
    } catch (error) {
      console.log(error);
    }
  }
}
