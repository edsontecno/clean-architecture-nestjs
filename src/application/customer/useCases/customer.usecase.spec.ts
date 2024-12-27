import { Test, TestingModule } from '@nestjs/testing';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { OrderStatus } from '../../../application/order/entities/OrderStatus';
import { BusinessRuleException } from '../../../system/filtros/business-rule-exception';
import { Customer } from '../entities/Customer';
import { ICustomerData } from '../interfaces/ICustomerData';
import { CustomerUseCase } from './CustomerUseCase';

jest.mock('cpf-cnpj-validator', () => ({
  cpf: {
    isValid: jest.fn(),
  },
}));

describe('CustomerUseCase', () => {
  let useCase: CustomerUseCase;
  let persistMock: Partial<ICustomerData>;

  beforeEach(async () => {
    persistMock = {
      saveCustomer: jest.fn(),
      getCustomerByCpf: jest.fn(),
      deleteCustomer: jest.fn(),
      updateCustomer: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerUseCase,
        { provide: ICustomerData, useValue: persistMock },
      ],
    }).compile();

    useCase = module.get<CustomerUseCase>(CustomerUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('saveCustomer', () => {
    it('should save a customer if all validations pass', async () => {
      const customer: Customer = {
        id: undefined,
        name: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '12345678909',
        orders: [],
      };

      (cpfValidator.isValid as jest.Mock).mockReturnValue(true);
      (persistMock.getCustomerByCpf as jest.Mock).mockResolvedValue({
        id: undefined,
      });
      (persistMock.saveCustomer as jest.Mock).mockResolvedValue(customer);

      const result = await useCase.saveCustomer(customer);

      expect(cpfValidator.isValid).toHaveBeenCalledWith(customer.cpf);
      expect(persistMock.saveCustomer).toHaveBeenCalledWith(customer);
      expect(result).toEqual(customer);
    });

    it('should throw an error if CPF is already registered', async () => {
      const customer: Customer = {
        id: undefined,
        name: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '12345678909',
        orders: [],
      };

      (cpfValidator.isValid as jest.Mock).mockReturnValue(true);
      (persistMock.getCustomerByCpf as jest.Mock).mockResolvedValue({ id: 1 });

      await expect(useCase.saveCustomer(customer)).rejects.toThrow(
        new BusinessRuleException('CPF já cadastrado na base de dados'),
      );
    });

    it('should throw an error if CPF is invalid', async () => {
      const customer: Customer = {
        id: undefined,
        name: 'John Doe',
        email: 'john.doe@example.com',
        cpf: 'invalid_cpf',
        orders: [],
      };

      (cpfValidator.isValid as jest.Mock).mockReturnValue(false);

      await expect(useCase.saveCustomer(customer)).rejects.toThrow(
        new BusinessRuleException('CPF informado não é válido'),
      );
    });

    it('should throw an error if email is invalid', async () => {
      const customer: Customer = {
        id: undefined,
        name: 'John Doe',
        email: 'invalid_email',
        cpf: '12345678909',
        orders: [],
      };

      (cpfValidator.isValid as jest.Mock).mockReturnValue(true);

      await expect(useCase.saveCustomer(customer)).rejects.toThrow(
        new BusinessRuleException('O email informado é inválido'),
      );
    });
  });

  describe('deleteCustomer', () => {
    it('should delete a customer if there are no orders', async () => {
      const customer: Customer = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '12345678909',
        orders: [],
      };

      (persistMock.getCustomerByCpf as jest.Mock).mockResolvedValue(customer);

      await expect(
        useCase.deleteCustomer(customer.cpf),
      ).resolves.toBeUndefined();

      expect(persistMock.deleteCustomer).toHaveBeenCalledWith(customer.cpf);
    });

    it('should throw an error if the customer has orders', async () => {
      const customer: Customer = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '12345678909',
        orders: [
          {
            id: 1,
            total: 1,
            items: [],
            customerId: '1',
            status: OrderStatus.InProgress,
            awaitTime: '',
            createdAt: '',
            payment: {
              amount: 1,
              descritpion: '',
              qrcode: '',
              status: undefined,
              mp_id: undefined,
            },
          },
        ],
      };

      (persistMock.getCustomerByCpf as jest.Mock).mockResolvedValue(customer);

      await expect(useCase.deleteCustomer(customer.cpf)).rejects.toThrow(
        new BusinessRuleException(
          'Não é possível deletar customers com pedidos vinculados',
        ),
      );
    });
  });

  describe('updateCustomer', () => {
    it('should update a customer if all validations pass', async () => {
      const customer: Customer = {
        id: 1,
        name: 'John Doe Updated',
        email: 'john.updated@example.com',
        cpf: '12345678909',
        orders: [],
      };

      const existingCustomer = { id: 1, cpf: '12345678909' };

      (cpfValidator.isValid as jest.Mock).mockReturnValue(true);
      (persistMock.getCustomerByCpf as jest.Mock).mockResolvedValue(
        existingCustomer,
      );
      (persistMock.updateCustomer as jest.Mock).mockResolvedValue(customer);

      const result = await useCase.updateCustomer(customer.cpf, customer);

      expect(persistMock.getCustomerByCpf).toHaveBeenCalledWith(customer.cpf);
      expect(persistMock.updateCustomer).toHaveBeenCalledWith(customer);
      expect(result).toEqual(customer);
    });

    it('should throw an error if CPF does not exist', async () => {
      const customer: Customer = {
        id: 1,
        name: 'John Doe Updated',
        email: 'john.updated@example.com',
        cpf: '12345678909',
        orders: [],
      };

      (persistMock.getCustomerByCpf as jest.Mock).mockResolvedValue({});

      await expect(
        useCase.updateCustomer(customer.cpf, customer),
      ).rejects.toThrow(
        new BusinessRuleException('CPF não localizado na base de dados'),
      );
    });
  });
});
