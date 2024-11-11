import { Injectable } from '@nestjs/common';
import { PaymentUseCase } from 'src/application/payment/useCases/PaymentUseCase';

@Injectable()
export class PaymentAdapterController {
  constructor(private readonly useCase: PaymentUseCase) {}

  async handleWebhook(payment_id: number) {
    return await this.useCase.handleWebhook(payment_id);
  }
}
