import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { OrderAdapterController } from '../../adapters/order/controller/OrderAdapterController';
import { CreateOrderDto } from '../../adapters/order/dto/create-order.dto';
import { OrderController } from './order.controller';

describe('OrderController', () => {
  let controller: OrderController;
  let adapterMock: Partial<OrderAdapterController>;

  beforeEach(async () => {
    // Mock do OrderAdapterController
    adapterMock = {
      save: jest.fn(),
      getOrders: jest.fn(),
      getListStatus: jest.fn(),
      getAllByStatus: jest.fn(),
      getById: jest.fn(),
      findStatusOrder: jest.fn(),
      getOrderByCustomer: jest.fn(),
      changeStatus: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderAdapterController, useValue: adapterMock }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('save', () => {
    it('should create a new order', async () => {
      const orderDto: CreateOrderDto = {
        items: [{ productId: 1, amount: 1 }],
      };
      const user = { id: 1, name: 'Test User' };
      const expectedResult = { id: 1, ...orderDto, customer: user };

      (adapterMock.save as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.save(orderDto, user);

      expect(adapterMock.save).toHaveBeenCalledWith({
        ...orderDto,
        customer: user,
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getOrders', () => {
    it('should return all ongoing orders', async () => {
      const orders = [{ id: 1 }, { id: 2 }];
      (adapterMock.getOrders as jest.Mock).mockResolvedValue(orders);

      const result = await controller.getOrders();

      expect(adapterMock.getOrders).toHaveBeenCalled();
      expect(result).toEqual(orders);
    });
  });

  describe('getListStatus', () => {
    it('should return all available statuses', async () => {
      const statuses = ['received', 'preparing', 'ready'];
      (adapterMock.getListStatus as jest.Mock).mockResolvedValue(statuses);

      const result = await controller.getListStatus();

      expect(adapterMock.getListStatus).toHaveBeenCalled();
      expect(result).toEqual(statuses);
    });
  });

  describe('getAll', () => {
    it('should return all orders by status', async () => {
      const status = 'preparing';
      const orders = [{ id: 1, status }];
      (adapterMock.getAllByStatus as jest.Mock).mockResolvedValue(orders);

      const result = await controller.getAll(status);

      expect(adapterMock.getAllByStatus).toHaveBeenCalledWith(status);
      expect(result).toEqual(orders);
    });
  });

  describe('findOne', () => {
    it('should return an order by id', async () => {
      const orderId = 1;
      const order = { id: orderId };
      (adapterMock.getById as jest.Mock).mockResolvedValue(order);

      const result = await controller.findOne(orderId);

      expect(adapterMock.getById).toHaveBeenCalledWith(orderId);
      expect(result).toEqual(order);
    });
  });

  describe('findStatusOrder', () => {
    it('should return the status of an order by id', async () => {
      const orderId = 1;
      const status = 'ready';
      (adapterMock.findStatusOrder as jest.Mock).mockResolvedValue(status);

      const result = await controller.findStatusOrder(orderId);

      expect(adapterMock.findStatusOrder).toHaveBeenCalledWith(orderId);
      expect(result).toEqual(status);
    });
  });

  describe('getOrderByCustomer', () => {
    it('should return all orders by customer', async () => {
      const cpf = '12345678900';
      const orders = [{ id: 1, customerCpf: cpf }];
      (adapterMock.getOrderByCustomer as jest.Mock).mockResolvedValue(orders);

      const result = await controller.getOrderByCustomer(cpf);

      expect(adapterMock.getOrderByCustomer).toHaveBeenCalledWith(cpf);
      expect(result).toEqual(orders);
    });
  });

  describe('changeStatus', () => {
    it('should change the status of an order', async () => {
      const orderId = '1';
      const status = 'ready';
      const updatedOrder = { id: orderId, status };
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (adapterMock.changeStatus as jest.Mock).mockResolvedValue(updatedOrder);

      await controller.changeStatus(orderId, status, responseMock);

      expect(adapterMock.changeStatus).toHaveBeenCalledWith(orderId, status);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledWith(updatedOrder);
    });
  });
});
