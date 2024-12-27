import { Test, TestingModule } from '@nestjs/testing';
import { ICategoryUseCase } from '../../../application/category/interfaces/ICategoryUseCase';
import { BusinessRuleException } from '../../../system/filtros/business-rule-exception';
import { Product } from '../entities/Product';
import { IProductData } from '../interfaces/IProductData';
import { ProductUseCase } from './ProductUseCase';

describe('ProductUseCase', () => {
  let useCase: ProductUseCase;
  let productDataMock: Partial<IProductData>;
  let categoryServiceMock: Partial<ICategoryUseCase>;

  beforeEach(async () => {
    productDataMock = {
      save: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      findAllByCategory: jest.fn(),
    };

    categoryServiceMock = {
      getSigle: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductUseCase,
        { provide: IProductData, useValue: productDataMock },
        { provide: ICategoryUseCase, useValue: categoryServiceMock },
      ],
    }).compile();

    useCase = module.get<ProductUseCase>(ProductUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('save', () => {
    it('should save a product if fields are valid and category exists', async () => {
      const product: Product = {
        id: 1,
        name: 'Coca-Cola',
        description: 'Refrigerante de cola',
        price: 5.99,
        category: 1,
        image: undefined,
      };

      const category = {
        id: 1,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
      };

      (categoryServiceMock.getSigle as jest.Mock).mockResolvedValue(category);
      (productDataMock.save as jest.Mock).mockResolvedValue(product);

      const result = await useCase.save(product);

      expect(categoryServiceMock.getSigle).toHaveBeenCalledWith(
        product.category,
      );
      expect(productDataMock.save).toHaveBeenCalledWith(product);
      expect(result).toEqual(product);
    });

    it('should throw an error if a required field is missing', async () => {
      const product: Product = {
        id: 1,
        name: '',
        description: 'Refrigerante de cola',
        price: 5.99,
        category: 1,
        image: undefined,
      };

      await expect(useCase.save(product)).rejects.toThrow(
        new BusinessRuleException('Campo nome é de preenchimento obrigatório'),
      );
    });

    it('should throw an error if category is invalid', async () => {
      const product: Product = {
        id: 1,
        name: 'Coca-Cola',
        description: 'Refrigerante de cola',
        price: 5.99,
        category: 999, // Categoria inexistente
        image: undefined,
      };

      (categoryServiceMock.getSigle as jest.Mock).mockResolvedValue({});

      await expect(useCase.save(product)).rejects.toThrow(
        new BusinessRuleException('A categoria informada é inválida'),
      );
    });
  });

  describe('get', () => {
    it('should return a product if it exists', async () => {
      const product: Product = {
        id: 1,
        name: 'Coca-Cola',
        description: 'Refrigerante de cola',
        price: 5.99,
        category: 1,
        image: undefined,
      };

      (productDataMock.get as jest.Mock).mockResolvedValue(product);

      const result = await useCase.get(1);

      expect(productDataMock.get).toHaveBeenCalledWith(1);
      expect(result).toEqual(product);
    });

    it('should throw an error if the product does not exist', async () => {
      (productDataMock.get as jest.Mock).mockResolvedValue({});

      await expect(useCase.get(1)).rejects.toThrow(
        new BusinessRuleException('Produto não localizado'),
      );
    });
  });

  describe('delete', () => {
    it('should delete a product if it is not linked to any orders', async () => {
      (productDataMock.delete as jest.Mock).mockResolvedValue(undefined);

      await expect(useCase.delete(1)).resolves.toBeUndefined();

      expect(productDataMock.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the product is linked to orders', async () => {
      (productDataMock.delete as jest.Mock).mockRejectedValue(
        new Error('PRODUTO_VINCULADO'),
      );

      await expect(useCase.delete(1)).rejects.toThrow(
        new BusinessRuleException(
          'Não é possível deletar produtos vinculados à pedidos',
        ),
      );
    });
  });

  describe('update', () => {
    it('should update a product if fields are valid', async () => {
      const product: Product = {
        id: 1,
        name: 'Coca-Cola',
        description: 'Refrigerante de cola',
        price: 6.99,
        category: 1,
        image: undefined,
      };

      const category = {
        id: 1,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
      };

      (categoryServiceMock.getSigle as jest.Mock).mockResolvedValue(category);
      (productDataMock.update as jest.Mock).mockResolvedValue(product);

      const result = await useCase.update(1, product);

      expect(categoryServiceMock.getSigle).toHaveBeenCalledWith(
        product.category,
      );
      expect(productDataMock.update).toHaveBeenCalledWith(1, product);
      expect(result).toEqual(product);
    });

    it('should throw an error if a required field is missing', async () => {
      const product: Product = {
        id: 1,
        name: '',
        description: 'Refrigerante de cola',
        price: 5.99,
        category: 1,
        image: undefined,
      };

      await expect(useCase.update(1, product)).rejects.toThrow(
        new BusinessRuleException('Campo nome é de preenchimento obrigatório'),
      );
    });
  });

  describe('findAllByCategory', () => {
    it('should return all products for a given category', async () => {
      const products: Product[] = [
        {
          id: 1,
          name: 'Coca-Cola',
          description: 'Refrigerante de cola',
          price: 5.99,
          category: 1,
          image: undefined,
        },
        {
          id: 2,
          name: 'Fanta',
          description: 'Refrigerante de laranja',
          price: 4.99,
          category: 1,
          image: undefined,
        },
      ];

      (productDataMock.findAllByCategory as jest.Mock).mockResolvedValue(
        products,
      );

      const result = await useCase.findAllByCategory(1);

      expect(productDataMock.findAllByCategory).toHaveBeenCalledWith(1);
      expect(result).toEqual(products);
    });
  });
});
