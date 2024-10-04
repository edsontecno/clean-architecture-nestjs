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
    private readonly useCase: PaymentUseCase
  ) {}

  async createPayment(amount: PaymentDTO) {
    return await this.useCase.createPayment(amount);
  }

  async handleWebhook(payment_id: number) {
    return await this.useCase.handleWebhook(payment_id);
  }
}