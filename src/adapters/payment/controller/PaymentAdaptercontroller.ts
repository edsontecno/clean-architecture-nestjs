import { Injectable } from '@nestjs/common';
import { PaymentDTO } from '../dto/PaymentDto';
import { PaymentPresenter } from '../presenter/PaymentPresenter';
import { IPaymentUseCase } from 'src/application/payment/interfaces/IPaymentUseCases';
import { IPaymentData } from 'src/application/payment/interfaces/IPaymentData';
import { PaymentGateway } from '../gateway/PaymentGateway';

@Injectable()
export class PaymentAdapterController {
  constructor(
    private readonly useCase: IPaymentUseCase,
    private readonly gateway: PaymentGateway,
    private readonly presenter: PaymentPresenter
  ) {}

  async createPayment(price: PaymentDTO) {
    const entity = await this.useCase.createPayment(price);
    const presenter =  this.presenter.convertEntityToResponseDto(entity);
    return await this.gateway.createPayment(presenter);
  }

  // @Post('webhook')
  // async handleWebhook(@Req() req: Request, @Res() res: Response) {
  //   await this.handleWebhookUseCase.execute(req.body);
  //   return res.status(200).send('OK');
  // }
}