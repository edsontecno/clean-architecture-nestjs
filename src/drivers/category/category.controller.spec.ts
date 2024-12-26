import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryAdapterController } from '../../adapters/category/controller/CategoryAdapterController';
import { CreateCategoryDto } from '../../adapters/category/dto/create-category.dto';
import { CategoryDto } from '../../adapters/category/dto/category.dto';
import { Response } from 'express';
import { ICategoryUseCase } from 'src/application/category/interfaces/ICategoryUseCase';

describe('CategoryController', () => {
  let controller: CategoryController;
  let adapterMock: Partial<CategoryAdapterController>;
  let useCaseMock: Partial<ICategoryUseCase>;

  beforeEach(async () => {
    useCaseMock = {
      save: jest.fn(),
      get: jest.fn(),
      getSigle: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    // Mock do Adapter
    adapterMock = {
      save: jest.fn(),
      getSigle: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        { provide: 'ICategoryUseCase', useValue: useCaseMock },
        { provide: CategoryAdapterController, useValue: adapterMock },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createDto: CreateCategoryDto = {
        name: 'Bebida',
        description: 'Categoria para bebidas',
      };
      const categoryDto: CategoryDto = { id: 1, ...createDto };

      (adapterMock.save as jest.Mock).mockResolvedValue(categoryDto);

      const result = await controller.create(createDto);

      expect(adapterMock.save).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(categoryDto);
    });
  });

  describe('findOne', () => {
    it('should retrieve a category by id', async () => {
      const categoryId = 1;
      const categoryDto: CategoryDto = {
        id: categoryId,
        name: 'Lanche',
        description: 'Categoria para lanches',
      };

      (adapterMock.getSigle as jest.Mock).mockResolvedValue(categoryDto);

      const result = await controller.findOne(categoryId);

      expect(adapterMock.getSigle).toHaveBeenCalledWith(categoryId);
      expect(result).toEqual(categoryDto);
    });
  });

  describe('update', () => {
    it('should update a category by id', async () => {
      const categoryId = 1;
      const updateDto: CreateCategoryDto = {
        name: 'Bebida Atualizada',
        description: 'Categoria atualizada para bebidas',
      };
      const updatedCategoryDto: CategoryDto = {
        id: categoryId,
        ...updateDto,
      };

      (adapterMock.update as jest.Mock).mockResolvedValue(updatedCategoryDto);

      const result = await controller.update(categoryId, updateDto);

      expect(adapterMock.update).toHaveBeenCalledWith(categoryId, updateDto);
      expect(result).toEqual(updatedCategoryDto);
    });
  });

  describe('remove', () => {
    it('should delete a category by id', async () => {
      const categoryId = 1;
      const responseMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (adapterMock.delete as jest.Mock).mockResolvedValue(undefined);

      await controller.remove(categoryId, responseMock);

      expect(adapterMock.delete).toHaveBeenCalledWith(categoryId);
      expect(responseMock.status).toHaveBeenCalledWith(204);
      expect(responseMock.json).toHaveBeenCalled();
    });
  });
});
