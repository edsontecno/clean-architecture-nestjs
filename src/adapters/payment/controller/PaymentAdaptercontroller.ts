import { Injectable } from '@nestjs/common';
import { PaymentDTO } from '../dto/PaymentDto';
import { PaymentPresenter } from '../presenter/PaymentPresenter';
import { IPaymentUseCase } from 'src/application/payment/interfaces/IPaymentUseCases';
import { IPaymentData } from 'src/application/payment/interfaces/IPaymentData';

@Injectable()
export class PaymentAdapterController {
  constructor(
    private readonly useCase: IPaymentUseCase,
    private readonly gateway: IPaymentData,
    private readonly presenter: PaymentPresenter
  ) {}

  async createPayment(paymentDto: PaymentDTO) {
    console.log(paymentDto);
    // return this.createPaymentUseCase.execute(paymentDto);
  }

  // @Post('webhook')
  // async handleWebhook(@Req() req: Request, @Res() res: Response) {
  //   await this.handleWebhookUseCase.execute(req.body);
  //   return res.status(200).send('OK');
  // }
}