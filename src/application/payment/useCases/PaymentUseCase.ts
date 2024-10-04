import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PaymentDTO } from 'src/adapters/payment/dto/PaymentDto';
import { MercadoPagoConfig, Payment } from 'mercadopago';

@Injectable()
export class PaymentUseCase {
  private ACCESS_TOKEN_TEST = 'TEST-2282551978833497-100320-c82d058610e7b085af78d1551645b98f-676499050'

  async createPayment(amount: PaymentDTO) {
    try {
      const client = new MercadoPagoConfig({ accessToken: this.ACCESS_TOKEN_TEST });
      const payment = new Payment(client);
      const body = {
        transaction_amount: amount.amount,
        description: 'Compra no PIX',
        payment_method_id: 'pix',
        notification_url: 'https://3b90-2804-14c-d3-81b1-6836-58e5-e666-92ff.ngrok-free.app/webhook',
        payer: {
          email: 'gabriel.f.lazari@gmail.com'
        },
      };
      const { point_of_interaction: { transaction_data: { qr_code } }, id } = await payment.create({ body });
      return { payment_id: id, qr_code: qr_code };
    } catch (error) {
      console.log(error);
    }
  }

  async handleWebhook(payment_id: number) {
    try {
      const url = `https://api.mercadopago.com/v1/payments/${payment_id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.ACCESS_TOKEN_TEST}`,
          'Content-Type': 'application/json'
        }
      });

      return { status: response.data.status };
    } catch (error) {
      console.log(error);
    }
  }
}