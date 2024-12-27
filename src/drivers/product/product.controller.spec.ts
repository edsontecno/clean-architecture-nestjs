import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductAdapterController } from '../../adapters/product/controller/ProductAdapterController';
import { CreateProductDto } from '../../adapters/product/dto/create-product.dto';
import { Response } from 'express';
import { Product } from '../../application/product/entities/Product';

describe('ProductController', () => {
  let controller: ProductController;
  let adapterMock: Partial<ProductAdapterController>;

  beforeEach(async () => {
    // Mock do ProductAdapterController
    adapterMock = {
      create: jest.fn(),
      findOne: jest.fn(),
      findAllByCategory: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductAdapterController, useValue: adapterMock }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const productDto: CreateProductDto = {
        name: 'Doce de leite',
        description: 'Doce de leite da fazenda',
        price: 5.99,
        image: '',
        category: 1,
      };

      const product = new Product(
        null,
        productDto.name,
        productDto.description,
        productDto.price,
        productDto.image,
        productDto.category,
      );
      Object.assign(product, productDto);

      (adapterMock.create as jest.Mock).mockResolvedValue(product);

      const result = await controller.create(productDto);

      expect(adapterMock.create).toHaveBeenCalledWith(product);
      expect(result).toEqual(product);
    });
  });

  describe('findOne', () => {
    it('should retrieve a product by id', async () => {
      const productId = 1;
      const product = {
        id: productId,
        name: 'Doce de leite',
        description: 'Doce de leite da fazenda',
        price: 5.99,
        image: '',
        category: 1,
      };

      (adapterMock.findOne as jest.Mock).mockResolvedValue(product);

      const result = await controller.findOne(productId);

      expect(adapterMock.findOne).toHaveBeenCalledWith(productId);
      expect(result).toEqual(product);
    });
  });

  describe('findAllByCategory', () => {
    it('should retrieve all products by category id', async () => {
      const categoryId = 1;
      const products = [
        {
          id: 1,
          name: 'Doce de leite',
          description: 'Doce de leite da fazenda',
          price: 5.99,
          image: '',
          category: categoryId,
        },
      ];

      (adapterMock.findAllByCategory as jest.Mock).mockResolvedValue(products);

      const result = await controller.findAllByCategory(categoryId);

      expect(adapterMock.findAllByCategory).toHaveBeenCalledWith(categoryId);
      expect(result).toEqual(products);
    });
  });

  describe('update', () => {
    it('should update a product by id', async () => {
      const productId = 1;
      const productDto: CreateProductDto = {
        name: 'Doce de leite atualizado',
        description: 'Atualizado',
        price: 6.99,
        image: '',
        category: 1,
      };

      const updatedProduct = { id: productId, ...productDto };

      (adapterMock.update as jest.Mock).mockResolvedValue(updatedProduct);

      const result = await controller.update(productId, productDto);

      expect(adapterMock.update).toHaveBeenCalledWith(productId, productDto);
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('remove', () => {
    it('should delete a product by id', async () => {
      const productId = 1;
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (adapterMock.remove as jest.Mock).mockResolvedValue(undefined);

      await controller.remove(productId, responseMock);

      expect(adapterMock.remove).toHaveBeenCalledWith(productId);
      expect(responseMock.status).toHaveBeenCalledWith(204);
      expect(responseMock.json).toHaveBeenCalled();
    });
  });
});
