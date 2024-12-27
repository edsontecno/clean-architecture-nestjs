import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentAdapterController } from '../../adapters/payment/controller/PaymentAdaptercontroller';

describe('PaymentController', () => {
  let controller: PaymentController;
  let adapterMock: Partial<PaymentAdapterController>;

  beforeEach(async () => {
    adapterMock = {
      handleWebhook: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [{ provide: PaymentAdapterController, useValue: adapterMock }],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('handleWebhook', () => {
    it('should handle webhook events and return a success response', async () => {
      const payload = {
        data: {
          id: '12345678',
        },
      };
      const expectedResponse = { success: true };

      (adapterMock.handleWebhook as jest.Mock).mockResolvedValue(
        expectedResponse,
      );

      const result = await controller.handleWebhook(payload);

      expect(adapterMock.handleWebhook).toHaveBeenCalledWith(payload.data.id);
      expect(result).toEqual(expectedResponse);
    });
  });
});
