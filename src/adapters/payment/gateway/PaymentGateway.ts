import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PaymentDTO } from '../dto/PaymentDto';

@Injectable()
export class PaymentGateway {
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
        description: 'compra teste',
        external_reference: 'reference_12345',
        items: [
          {
            sku_number: 'A123K9191938',
            category: 'marketplace',
            title: 'FIAP - Pós-Graduação',
            description: 'Loja de teste',
            unit_price: price.price,
            quantity: 1,
            unit_measure: 'unit',
            total_amount: price.price
          }
        ],
        notification_url: 'https://www.yourserver.com/notifications',
        sponsor: {
          id: 662208785
        },
        title: 'Product order',
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
}