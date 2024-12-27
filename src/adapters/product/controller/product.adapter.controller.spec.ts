import { Test, TestingModule } from '@nestjs/testing';
import { IProductUseCase } from '../../../application/product/interfaces/IProductUseCase';
import { IProductData } from '../../../application/product/interfaces/IProductData';
import { ProdutctPresenter } from '../presenter/ProductPresenter';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductAdapterController } from './ProductAdapterController';

describe('ProductAdapterController', () => {
  let controller: ProductAdapterController;
  let useCaseMock: Partial<IProductUseCase>;
  let gatewayMock: Partial<IProductData>;
  let presenterMock: Partial<ProdutctPresenter>;

  beforeEach(async () => {
    useCaseMock = {
      save: jest.fn(),
      get: jest.fn(),
      findAllByCategory: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    gatewayMock = {
      convertDtoToEntity: jest.fn(),
    };

    presenterMock = {
      returnIdOfEntity: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductAdapterController,
        { provide: IProductUseCase, useValue: useCaseMock },
        { provide: IProductData, useValue: gatewayMock },
        { provide: ProdutctPresenter, useValue: presenterMock },
      ],
    }).compile();

    controller = module.get<ProductAdapterController>(ProductAdapterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product and return its ID', async () => {
      const productDto: CreateProductDto = {
        name: 'Coca-Cola',
        description: 'Refrigerante',
        price: 5.99,
        category: 1,
        image: '',
      };
      const productEntity = {
        id: 1,
        name: 'Coca-Cola',
        description: 'Refrigerante',
        price: 5.99,
        category: 1,
      };

      (gatewayMock.convertDtoToEntity as jest.Mock).mockReturnValue(
        productEntity,
      );
      (useCaseMock.save as jest.Mock).mockResolvedValue(productEntity);
      (presenterMock.returnIdOfEntity as jest.Mock).mockReturnValue(
        productEntity.id,
      );

      const result = await controller.create(productDto);

      expect(gatewayMock.convertDtoToEntity).toHaveBeenCalledWith(productDto);
      expect(useCaseMock.save).toHaveBeenCalledWith(productEntity);
      expect(presenterMock.returnIdOfEntity).toHaveBeenCalledWith(
        productEntity,
      );
      expect(result).toBe(productEntity.id);
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      const productId = 1;
      const productEntity = {
        id: 1,
        name: 'Coca-Cola',
        description: 'Refrigerante',
        price: 5.99,
        category: 1,
      };

      (useCaseMock.get as jest.Mock).mockResolvedValue(productEntity);

      const result = await controller.findOne(productId);

      expect(useCaseMock.get).toHaveBeenCalledWith(productId);
      expect(result).toEqual(productEntity);
    });
  });

  describe('findAllByCategory', () => {
    it('should return all products for a category', async () => {
      const categoryId = 1;
      const products = [
        {
          id: 1,
          name: 'Coca-Cola',
          description: 'Refrigerante',
          price: 5.99,
          category: 1,
        },
        {
          id: 2,
          name: 'Fanta',
          description: 'Refrigerante de laranja',
          price: 4.99,
          category: 1,
        },
      ];

      (useCaseMock.findAllByCategory as jest.Mock).mockResolvedValue(products);

      const result = await controller.findAllByCategory(categoryId);

      expect(useCaseMock.findAllByCategory).toHaveBeenCalledWith(categoryId);
      expect(result).toEqual(products);
    });
  });

  describe('update', () => {
    it('should update a product and return the updated entity', async () => {
      const productId = 1;
      const productDto: CreateProductDto = {
        name: 'Coca-Cola Zero',
        description: 'Refrigerante diet',
        price: 6.99,
        category: 1,
        image: '',
      };
      const updatedProductEntity = {
        id: 1,
        name: 'Coca-Cola Zero',
        description: 'Refrigerante diet',
        price: 6.99,
        category: 1,
      };

      (gatewayMock.convertDtoToEntity as jest.Mock).mockReturnValue(
        updatedProductEntity,
      );
      (useCaseMock.update as jest.Mock).mockResolvedValue(updatedProductEntity);

      const result = await controller.update(productId, productDto);

      expect(gatewayMock.convertDtoToEntity).toHaveBeenCalledWith(productDto);
      expect(useCaseMock.update).toHaveBeenCalledWith(
        productId,
        updatedProductEntity,
      );
      expect(result).toEqual(updatedProductEntity);
    });
  });

  describe('remove', () => {
    it('should remove a product by ID', async () => {
      const productId = 1;

      (useCaseMock.delete as jest.Mock).mockResolvedValue(undefined);

      await expect(controller.remove(productId)).resolves.toBeUndefined();

      expect(useCaseMock.delete).toHaveBeenCalledWith(productId);
    });
  });
});
