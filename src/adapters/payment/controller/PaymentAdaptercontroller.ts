import { Injectable } from '@nestjs/common';
import { PaymentDTO } from '../dto/PaymentDto';
import { PaymentPresenter } from '../presenter/PaymentPresenter';
import { IPaymentUseCase } from 'src/application/payment/interfaces/IPaymentUseCases';
import { IPaymentData } from 'src/application/payment/interfaces/IPaymentData';
import { PaymentGateway } from '../gateway/PaymentGateway';
import { PaymentUseCase } from 'src/application/payment/useCases/PaymentUseCase';

@Injectable()
export class PaymentAdapterController {
  constructor(
    private readonly useCase: PaymentUseCase,
    private readonly gateway: PaymentGateway
  ) {}

  async handleWebhook(payment_id: number) {
    return await this.useCase.handleWebhook(payment_id);
  }

  async updateStatusPayment(payment_id: number, status: string) {
    return await this.gateway.updateStatusPayment(payment_id, status);
  }
}