import { Test, TestingModule } from '@nestjs/testing';
import { IOrderUseCase } from '../../order/interfaces/IOrderUseCase';
import axios from 'axios';
import { BusinessRuleException } from '../../../system/filtros/business-rule-exception';
import { PaymentUseCase } from './PaymentUseCase';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PaymentUseCase', () => {
  let paymentUseCase: PaymentUseCase;
  let orderUseCaseMock: Partial<IOrderUseCase>;

  beforeEach(async () => {
    orderUseCaseMock = {
      updateStatusPayment: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentUseCase,
        { provide: IOrderUseCase, useValue: orderUseCaseMock },
      ],
    }).compile();

    paymentUseCase = module.get<PaymentUseCase>(PaymentUseCase);
  });

  it('should be defined', () => {
    expect(paymentUseCase).toBeDefined();
  });

  describe('handleWebhook', () => {
    it('should return "Webhook ativo" if payment_id is not provided', async () => {
      const result = await paymentUseCase.handleWebhook(null);
      expect(result).toBe('Webhook ativo');
    });

    it('should update order status if payment is approved', async () => {
      const payment_id = 123456;
      const responseMock = {
        data: {
          id: payment_id,
          status: 'approved',
        },
      };

      mockedAxios.get.mockResolvedValue(responseMock);

      const result = await paymentUseCase.handleWebhook(payment_id);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://api.mercadopago.com/v1/payments/${payment_id}`,
        {
          headers: {
            Authorization: `Bearer TEST-2282551978833497-100320-c82d058610e7b085af78d1551645b98f-676499050`,
            'Content-Type': 'application/json',
          },
        },
      );
      expect(orderUseCaseMock.updateStatusPayment).toHaveBeenCalledWith(
        payment_id,
        'approved',
      );
      expect(result).toEqual({ pagamento: payment_id, status: 'approved' });
    });

    it('should update order status if payment is rejected', async () => {
      const payment_id = 987654;
      const responseMock = {
        data: {
          id: payment_id,
          status: 'rejected',
        },
      };

      mockedAxios.get.mockResolvedValue(responseMock);

      const result = await paymentUseCase.handleWebhook(payment_id);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://api.mercadopago.com/v1/payments/${payment_id}`,
        expect.any(Object),
      );
      expect(orderUseCaseMock.updateStatusPayment).toHaveBeenCalledWith(
        payment_id,
        'rejected',
      );
      expect(result).toEqual({ pagamento: payment_id, status: 'rejected' });
    });

    it('should throw a BusinessRuleException if axios request fails', async () => {
      const payment_id = 123456;
      mockedAxios.get.mockRejectedValue({
        response: {
          data: {
            message: 'Invalid payment ID',
          },
        },
      });

      await expect(paymentUseCase.handleWebhook(payment_id)).rejects.toThrow(
        new BusinessRuleException('Invalid payment ID'),
      );
    });
  });
});
