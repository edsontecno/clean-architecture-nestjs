import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Customer } from '../../../application/customer/entities/Customer';
import { ICustomerUseCase } from '../../..//application/customer/interfaces/ICustomerUseCase';
import { IProductData } from '../../..//application/product/interfaces/IProductData';
import { BusinessRuleException } from '../../..//system/filtros/business-rule-exception';
import { Order } from '../entities/Order';
import { OrderProcess } from '../entities/OrderProcess';
import { OrderStatus } from '../entities/OrderStatus';
import { IOrderData } from '../interfaces/IOrderData';
import { OrderUseCase } from './OrderUseCase';
import { Payment } from '../../..//application/payment/entities/Payment';

describe('OrderUseCase', () => {
  let useCase: OrderUseCase;
  let persistMock: Partial<IOrderData>;
  let productServiceMock: Partial<IProductData>;
  let customerUseCaseMock: Partial<ICustomerUseCase>;
  let configServiceMock: Partial<ConfigService>;

  beforeEach(async () => {
    persistMock = {
      save: jest.fn(),
      get: jest.fn(),
      getAllByStatus: jest.fn(),
      changeStatus: jest.fn(),
    };

    productServiceMock = {
      get: jest.fn(),
    };

    customerUseCaseMock = {
      getCustomer: jest.fn(),
      saveCustomer: jest.fn(),
    };

    configServiceMock = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderUseCase,
        { provide: IOrderData, useValue: persistMock },
        { provide: IProductData, useValue: productServiceMock },
        { provide: ICustomerUseCase, useValue: customerUseCaseMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    useCase = module.get<OrderUseCase>(OrderUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('save', () => {
    // it('should save an order if all validations pass', async () => {
    //   const order: Order = {
    //     customerId: undefined,
    //     items: [
    //       {
    //         productId: 1,
    //         amount: 2,
    //         productName: '',
    //         salePrice: 0,
    //       },
    //     ],
    //     id: 0,
    //     total: 0,
    //     status: OrderStatus.Pending,
    //     awaitTime: '',
    //     createdAt: '',
    //     payment: new Payment(),
    //   };

    //   const customer: Customer = {
    //     id: 1,
    //     name: 'John Doe',
    //     email: 'john.doe@example.com',
    //     cpf: '12345678909',
    //     orders: [],
    //   };

    //   const product = {
    //     id: 1,
    //     name: 'Coca-Cola',
    //     price: 5.99,
    //   };

    //   (customerUseCaseMock.getCustomer as jest.Mock).mockResolvedValue(
    //     customer,
    //   );
    //   (productServiceMock.get as jest.Mock).mockResolvedValue(product);
    //   (persistMock.save as jest.Mock).mockResolvedValue(order);

    //   const result = await useCase.save(order);

    //   expect(customerUseCaseMock.getCustomer).toHaveBeenCalled();
    //   expect(productServiceMock.get).toHaveBeenCalledWith(1);
    //   expect(persistMock.save).toHaveBeenCalledWith(expect.any(OrderProcess));
    //   expect(result).toEqual(order);
    // });

    it('should throw an error if no items are added', async () => {
      const order: Order = {
        customerId: undefined,
        items: [],
        id: 0,
        total: 0,
        status: OrderStatus.Pending,
        awaitTime: '',
        createdAt: '',
        payment: new Payment(),
      };

      await expect(useCase.save(order)).rejects.toThrow(
        new BusinessRuleException('Nenhum produto foi adicionado ao pedido'),
      );
    });
  });

  describe('prepareItems', () => {
    it('should add items to the order process', async () => {
      const order: Order = {
        items: [
          { productId: 1, amount: 2, productName: 'Produto', salePrice: 12.0 },
        ],
        id: 0,
        total: 0,
        customerId: '',
        status: OrderStatus.Pending,
        awaitTime: '',
        createdAt: '',
        payment: new Payment(),
      };
      const orderProcess = new OrderProcess();
      const product = {
        id: 1,
        name: 'Coca-Cola',
        price: 5.99,
      };

      (productServiceMock.get as jest.Mock).mockResolvedValue(product);

      await useCase['prepareItems'](order, orderProcess);

      expect(orderProcess.items.length).toBe(1);
      expect(orderProcess.total).toBe(11.98); // 2 * 5.99
    });

    it('should throw an error if product ID is missing', async () => {
      const order: Order = {
        items: [
          {
            productId: null,
            amount: 2,
            productName: '',
            salePrice: 0,
          },
        ],
        id: 0,
        total: 0,
        customerId: '',
        status: OrderStatus.Pending,
        awaitTime: '',
        createdAt: '',
        payment: new Payment(),
      };
      const orderProcess = new OrderProcess();

      await expect(
        useCase['prepareItems'](order, orderProcess),
      ).rejects.toThrow(
        new BusinessRuleException('Por favor informe o produto desejado'),
      );
    });

    it('should throw an error if product does not exist', async () => {
      const order: Order = {
        items: [
          {
            productId: 1,
            amount: 2,
            productName: '',
            salePrice: 0,
          },
        ],
        id: 0,
        total: 0,
        customerId: '',
        status: OrderStatus.Pending,
        awaitTime: '',
        createdAt: '',
        payment: new Payment(),
      };
      const orderProcess = new OrderProcess();

      (productServiceMock.get as jest.Mock).mockResolvedValue({
        id: undefined,
      });

      await expect(
        useCase['prepareItems'](order, orderProcess),
      ).rejects.toThrow(
        new BusinessRuleException(
          "O produto com id '1' não existe na base de dados",
        ),
      );
    });
  });

  describe('getAllByStatus', () => {
    it('should return all orders by status', async () => {
      const orders = [
        { id: 1, status: OrderStatus.Pending },
        { id: 2, status: OrderStatus.Pending },
      ];

      (persistMock.getAllByStatus as jest.Mock).mockResolvedValue(orders);

      const result = await useCase.getAllByStatus(OrderStatus.Pending);

      expect(persistMock.getAllByStatus).toHaveBeenCalledWith(
        OrderStatus.Pending,
      );
      expect(result).toEqual(orders);
    });

    it('should throw an error if the status is invalid', async () => {
      await expect(useCase.getAllByStatus('INVALID_STATUS')).rejects.toThrow(
        new BusinessRuleException('O status informado é inválido'),
      );
    });
  });

  describe('changeStatus', () => {
    it('should change the status of an order if the transition is valid', async () => {
      const order = { id: 1, status: OrderStatus.Pending };

      (persistMock.get as jest.Mock).mockResolvedValue(order);
      (persistMock.changeStatus as jest.Mock).mockResolvedValue({
        id: 1,
        status: OrderStatus.Received,
      });

      const result = await useCase.changeStatus(1, OrderStatus.Received);

      expect(persistMock.get).toHaveBeenCalledWith(1);
      expect(persistMock.changeStatus).toHaveBeenCalledWith(
        1,
        OrderStatus.Received,
      );
      expect(result).toEqual({ id: 1, status: OrderStatus.Received });
    });

    it('should throw an error if the order is not found', async () => {
      (persistMock.get as jest.Mock).mockResolvedValue(null);

      await expect(
        useCase.changeStatus(1, OrderStatus.Received),
      ).rejects.toThrow(new BusinessRuleException('Pedido não localizado'));
    });

    it('should throw an error if the status transition is invalid', async () => {
      const order = { id: 1, status: OrderStatus.Fineshed };

      (persistMock.get as jest.Mock).mockResolvedValue(order);

      await expect(
        useCase.changeStatus(1, OrderStatus.Received),
      ).rejects.toThrow(
        new BusinessRuleException('Transição de status inválida'),
      );
    });
  });
});
