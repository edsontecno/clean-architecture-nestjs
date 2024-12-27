import { Test, TestingModule } from '@nestjs/testing';
import { PaymentUseCase } from '../../../application/payment/useCases/PaymentUseCase';
import { PaymentAdapterController } from './PaymentAdaptercontroller';

describe('PaymentAdapterController', () => {
  let controller: PaymentAdapterController;
  let useCaseMock: Partial<PaymentUseCase>;

  beforeEach(async () => {
    useCaseMock = {
      handleWebhook: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentAdapterController,
        { provide: PaymentUseCase, useValue: useCaseMock },
      ],
    }).compile();

    controller = module.get<PaymentAdapterController>(PaymentAdapterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('handleWebhook', () => {
    it('should call useCase.handleWebhook with payment_id and return its result', async () => {
      const payment_id = 12345;
      const expectedResult = { status: 'approved', payment_id };

      (useCaseMock.handleWebhook as jest.Mock).mockResolvedValue(
        expectedResult,
      );

      const result = await controller.handleWebhook(payment_id);

      expect(useCaseMock.handleWebhook).toHaveBeenCalledWith(payment_id);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if useCase.handleWebhook fails', async () => {
      const payment_id = 12345;
      const errorMessage = 'Webhook processing failed';

      (useCaseMock.handleWebhook as jest.Mock).mockRejectedValue(
        new Error(errorMessage),
      );

      await expect(controller.handleWebhook(payment_id)).rejects.toThrow(
        errorMessage,
      );
      expect(useCaseMock.handleWebhook).toHaveBeenCalledWith(payment_id);
    });
  });
});
