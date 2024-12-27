import { Test, TestingModule } from '@nestjs/testing';
import { IOrderUseCase } from '../../../application/order/interfaces/IOrderUseCase';
import { IOrderData } from '../../../application/order/interfaces/IOrderData';
import { OrderPresenter } from '../presenter/OrderPresenter';
import { CreateOrderDto } from '../../../adapters/order/dto/create-order.dto';
import { ResponseOrderDTO } from '../dto/response-order.dto';
import { OrderAdapterController } from './OrderAdapterController';

describe('OrderAdapterController', () => {
  let controller: OrderAdapterController;
  let useCaseMock: Partial<IOrderUseCase>;
  let gatewayMock: Partial<IOrderData>;
  let presenterMock: Partial<OrderPresenter>;

  beforeEach(async () => {
    useCaseMock = {
      save: jest.fn(),
      getAllByStatus: jest.fn(),
      getOrderByCustomer: jest.fn(),
      changeStatus: jest.fn(),
      getListStatus: jest.fn(),
      getById: jest.fn(),
      getOrders: jest.fn(),
    };

    gatewayMock = {
      convertDtoToEntity: jest.fn(),
    };

    presenterMock = {
      convertEntityToResponseDto: jest.fn(),
      convertArrayEntityToArrayResponseDto: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderAdapterController,
        { provide: IOrderUseCase, useValue: useCaseMock },
        { provide: IOrderData, useValue: gatewayMock },
        { provide: OrderPresenter, useValue: presenterMock },
      ],
    }).compile();

    controller = module.get<OrderAdapterController>(OrderAdapterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('save', () => {
    it('should save an order and return the saved object', async () => {
      const createOrderDto: CreateOrderDto = {
        items: [{ productId: 1, amount: 2 }],
      };
      const orderEntity = { id: 1, items: [{ productId: 1, amount: 2 }] };
      const savedOrder = { id: 1, items: [{ productId: 1, amount: 2 }] };

      (gatewayMock.convertDtoToEntity as jest.Mock).mockReturnValue(
        orderEntity,
      );
      (useCaseMock.save as jest.Mock).mockResolvedValue(savedOrder);

      const result = await controller.save(createOrderDto);

      expect(gatewayMock.convertDtoToEntity).toHaveBeenCalledWith(
        createOrderDto,
      );
      expect(useCaseMock.save).toHaveBeenCalledWith(orderEntity);
      expect(result).toEqual(savedOrder);
    });
  });

  describe('getAllByStatus', () => {
    it('should return orders by status as DTOs', async () => {
      const status = 'Pending';
      const orders = [{ id: 1, status: 'Pending' }];
      const ordersDto = [{ id: 1, status: 'Pending' }];

      (useCaseMock.getAllByStatus as jest.Mock).mockResolvedValue(orders);
      (
        presenterMock.convertArrayEntityToArrayResponseDto as jest.Mock
      ).mockReturnValue(ordersDto);

      const result = await controller.getAllByStatus(status);

      expect(useCaseMock.getAllByStatus).toHaveBeenCalledWith(status);
      expect(
        presenterMock.convertArrayEntityToArrayResponseDto,
      ).toHaveBeenCalledWith(orders);
      expect(result).toEqual(ordersDto);
    });
  });

  describe('getOrderByCustomer', () => {
    it('should return orders by customer CPF as DTOs', async () => {
      const cpf = '12345678900';
      const orders = [{ id: 1, customerCpf: cpf }];
      const ordersDto = [{ id: 1, customerCpf: cpf }];

      (useCaseMock.getOrderByCustomer as jest.Mock).mockResolvedValue(orders);
      (
        presenterMock.convertArrayEntityToArrayResponseDto as jest.Mock
      ).mockReturnValue(ordersDto);

      const result = await controller.getOrderByCustomer(cpf);

      expect(useCaseMock.getOrderByCustomer).toHaveBeenCalledWith(cpf);
      expect(
        presenterMock.convertArrayEntityToArrayResponseDto,
      ).toHaveBeenCalledWith(orders);
      expect(result).toEqual(ordersDto);
    });
  });

  describe('changeStatus', () => {
    it('should change the status of an order and return the updated DTO', async () => {
      const orderId = '1';
      const status = 'Ready';
      const orderEntity = { id: 1, status: 'Ready' };
      const orderDto: ResponseOrderDTO = {
        id: 1,
        status: 'Ready',
        total: 0,
        customer: '',
        awaitTime: '',
        createdAt: '',
        items: [],
      };

      (useCaseMock.changeStatus as jest.Mock).mockResolvedValue(orderEntity);
      (presenterMock.convertEntityToResponseDto as jest.Mock).mockReturnValue(
        orderDto,
      );

      const result = await controller.changeStatus(orderId, status);

      expect(useCaseMock.changeStatus).toHaveBeenCalledWith(orderId, status);
      expect(presenterMock.convertEntityToResponseDto).toHaveBeenCalledWith(
        orderEntity,
      );
      expect(result).toEqual(orderDto);
    });
  });

  describe('getListStatus', () => {
    it('should return the list of statuses', async () => {
      const statuses = ['Pending', 'Ready'];

      (useCaseMock.getListStatus as jest.Mock).mockResolvedValue(statuses);

      const result = await controller.getListStatus();

      expect(useCaseMock.getListStatus).toHaveBeenCalled();
      expect(result).toEqual(statuses);
    });
  });

  describe('getById', () => {
    it('should return an order by ID as DTO', async () => {
      const orderId = 1;
      const orderEntity = { id: 1, status: 'Pending' };
      const orderDto: ResponseOrderDTO = {
        id: 1,
        status: 'Pending',
        total: 0,
        customer: '',
        awaitTime: '',
        createdAt: '',
        items: [],
      };

      (useCaseMock.getById as jest.Mock).mockResolvedValue(orderEntity);
      (presenterMock.convertEntityToResponseDto as jest.Mock).mockReturnValue(
        orderDto,
      );

      const result = await controller.getById(orderId);

      expect(useCaseMock.getById).toHaveBeenCalledWith(orderId);
      expect(presenterMock.convertEntityToResponseDto).toHaveBeenCalledWith(
        orderEntity,
      );
      expect(result).toEqual(orderDto);
    });
  });

  describe('findStatusOrder', () => {
    it('should return the status of an order by ID', async () => {
      const orderId = 1;
      const orderEntity = { id: 1, status: 'Pending' };

      (useCaseMock.getById as jest.Mock).mockResolvedValue(orderEntity);

      const result = await controller.findStatusOrder(orderId);

      expect(useCaseMock.getById).toHaveBeenCalledWith(orderId);
      expect(result).toBe(orderEntity.status);
    });
  });

  describe('getOrders', () => {
    it('should return all ongoing orders as DTOs', async () => {
      const orders = [{ id: 1, status: 'InProgress' }];
      const ordersDto = [{ id: 1, status: 'InProgress' }];

      (useCaseMock.getOrders as jest.Mock).mockResolvedValue(orders);
      (
        presenterMock.convertArrayEntityToArrayResponseDto as jest.Mock
      ).mockReturnValue(ordersDto);

      const result = await controller.getOrders();

      expect(useCaseMock.getOrders).toHaveBeenCalled();
      expect(
        presenterMock.convertArrayEntityToArrayResponseDto,
      ).toHaveBeenCalledWith(orders);
      expect(result).toEqual(ordersDto);
    });
  });
});
