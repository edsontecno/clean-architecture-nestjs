import { Test, TestingModule } from '@nestjs/testing';
import { ICustomerUseCase } from '../../../application/customer/interfaces/ICustomerUseCase';
import { ICustomerData } from '../../../application/customer/interfaces/ICustomerData';
import { CustomerPresenter } from '../presenter/CustomerPresenter';
import { CustomerDTO } from '../dto/CustomerDto';
import { CustomerAdapterController } from './CustumerAdapterController';

describe('CustomerAdapterController', () => {
  let controller: CustomerAdapterController;
  let useCaseMock: Partial<ICustomerUseCase>;
  let gatewayMock: Partial<ICustomerData>;
  let presenterMock: Partial<CustomerPresenter>;

  beforeEach(async () => {
    useCaseMock = {
      saveCustomer: jest.fn(),
      getCustomer: jest.fn(),
      deleteCustomer: jest.fn(),
      updateCustomer: jest.fn(),
    };

    gatewayMock = {
      convertCustomerDtoToEntity: jest.fn(),
    };

    presenterMock = {
      convertEntityToResponseDto: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerAdapterController,
        { provide: ICustomerUseCase, useValue: useCaseMock },
        { provide: ICustomerData, useValue: gatewayMock },
        { provide: CustomerPresenter, useValue: presenterMock },
      ],
    }).compile();

    controller = module.get<CustomerAdapterController>(
      CustomerAdapterController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('saveCustomer', () => {
    it('should save a customer and return the response DTO', async () => {
      const customerDto: CustomerDTO = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '12345678909',
      };
      const customerEntity = { id: 1, ...customerDto };
      const responseDto = { id: 1, ...customerDto };

      (gatewayMock.convertCustomerDtoToEntity as jest.Mock).mockReturnValue(
        customerEntity,
      );
      (useCaseMock.saveCustomer as jest.Mock).mockResolvedValue(customerEntity);
      (presenterMock.convertEntityToResponseDto as jest.Mock).mockReturnValue(
        responseDto,
      );

      const result = await controller.saveCustomer(customerDto);

      expect(gatewayMock.convertCustomerDtoToEntity).toHaveBeenCalledWith(
        customerDto,
      );
      expect(useCaseMock.saveCustomer).toHaveBeenCalledWith(customerEntity);
      expect(presenterMock.convertEntityToResponseDto).toHaveBeenCalledWith(
        customerEntity,
      );
      expect(result).toEqual(responseDto);
    });
  });

  describe('getCustomer', () => {
    it('should get a customer by CPF and return the response DTO', async () => {
      const cpf = '12345678909';
      const customerEntity = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        cpf,
      };
      const responseDto = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        cpf,
      };

      (useCaseMock.getCustomer as jest.Mock).mockResolvedValue(customerEntity);
      (presenterMock.convertEntityToResponseDto as jest.Mock).mockReturnValue(
        responseDto,
      );

      const result = await controller.getCustomer(cpf);

      expect(useCaseMock.getCustomer).toHaveBeenCalledWith(cpf);
      expect(presenterMock.convertEntityToResponseDto).toHaveBeenCalledWith(
        customerEntity,
      );
      expect(result).toEqual(responseDto);
    });
  });

  describe('deleteCustomer', () => {
    it('should delete a customer by CPF', async () => {
      const cpf = '12345678909';

      (useCaseMock.deleteCustomer as jest.Mock).mockResolvedValue(undefined);

      await expect(controller.deleteCustomer(cpf)).resolves.toBeUndefined();

      expect(useCaseMock.deleteCustomer).toHaveBeenCalledWith(cpf);
    });
  });

  describe('updateCustomer', () => {
    it('should update a customer and return the response DTO', async () => {
      const cpf = '12345678909';
      const customerDto: CustomerDTO = {
        name: 'John Doe Updated',
        email: 'john.updated@example.com',
        cpf,
      };
      const customerEntity = { id: 1, ...customerDto };
      const responseDto = { id: 1, ...customerDto };

      (gatewayMock.convertCustomerDtoToEntity as jest.Mock).mockReturnValue(
        customerEntity,
      );
      (useCaseMock.updateCustomer as jest.Mock).mockResolvedValue(
        customerEntity,
      );
      (presenterMock.convertEntityToResponseDto as jest.Mock).mockReturnValue(
        responseDto,
      );

      const result = await controller.updateCustomer(cpf, customerDto);

      expect(gatewayMock.convertCustomerDtoToEntity).toHaveBeenCalledWith(
        customerDto,
      );
      expect(useCaseMock.updateCustomer).toHaveBeenCalledWith(
        cpf,
        customerEntity,
      );
      expect(presenterMock.convertEntityToResponseDto).toHaveBeenCalledWith(
        customerEntity,
      );
      expect(result).toEqual(responseDto);
    });
  });
});
