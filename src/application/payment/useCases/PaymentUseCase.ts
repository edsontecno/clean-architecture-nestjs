import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PaymentDTO } from 'src/adapters/payment/dto/PaymentDto';

@Injectable()
export class PaymentUseCase {
  private tokenClient = 'APP_USR-1833424885856085-091020-0288cf7e54642ae177202c400b3b1b33-1986947542';
  private userIdVendedor = '1986947542';
  private externalPosId = 'SUC001POS001';

  async createPayment(price: PaymentDTO) {
    try {
      const url = `https://api.mercadopago.com/instore/orders/qr/seller/collectors/${this.userIdVendedor}/pos/${this.externalPosId}/qrs`;
      const body = {
        cash_out: {
          amount: 0
        },
        description: 'Produto',
        external_reference: 'reference_12345',
        items: [
          {
            sku_number: 'A123K9191938',
            category: 'marketplace',
            title: 'FIAP - Pós-Graduação',
            description: 'Restaurante',
            unit_price: price.price,
            quantity: 1,
            unit_measure: 'unit',
            total_amount: price.price
          }
        ],
        notification_url: 'https://webhook.site/73513925-c7ab-46fb-b0ac-e75a903b72ae',
        sponsor: {
          id: 662208785
        },
        title: 'Solicitação do pedido',
        total_amount: price.price
      }

      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${this.tokenClient}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      throw new Error(`Payment creation failed: ${error.message}`);
    }
  }

  async webHook(payment_id: number) {
    try {
      const url = `https://api.mercadopago.com/merchant_orders/${payment_id}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.tokenClient}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      throw new Error(`weebhook failed: ${error.message}`);
    }
  }
}