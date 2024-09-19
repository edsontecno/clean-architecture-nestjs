import { Injectable } from '@nestjs/common';
import * as mercadopago from 'mercadopago';

@Injectable()
export class PaymentGateway {
  constructor() {
    // mercadopago.configure({
    //   access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    // });
  }

//   async createPayment(preference: any) {
//     return await mercadopago.preferences.create(preference);
//   }
}