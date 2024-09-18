// import { Injectable } from '@nestjs/common';
// import { IPaymentData } from '../interfaces/IPaymentData';

// @Injectable()
// export class HandleWebhookUseCase {
//   constructor(private readonly paymentRepository: IPaymentData) {}

//   async execute(paymentData: any) {
//     const paymentId = paymentData.data.id;
//     const paymentStatus = paymentData.type;

//     await this.paymentRepository.updatePaymentStatus(paymentId, paymentStatus);
//   }
// }
