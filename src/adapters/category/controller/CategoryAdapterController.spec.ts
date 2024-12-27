import { Test, TestingModule } from '@nestjs/testing';
import { ICategoryUseCase } from '../../../application/category/interfaces/ICategoryUseCase';
import { ICategoryData } from '../../../application/category/interfaces/ICategoryData';
import { GategoryPresenter } from '../presenter/CategoryPresenter';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryDto } from '../dto/category.dto';
import { CategoryAdapterController } from './CategoryAdapterController';

describe('CategoryAdapterController', () => {
  let controller: CategoryAdapterController;
  let useCaseMock: Partial<ICategoryUseCase>;
  let gatewayMock: Partial<ICategoryData>;
  let presenterMock: Partial<GategoryPresenter>;

  beforeEach(async () => {
    useCaseMock = {
      save: jest.fn(),
      get: jest.fn(),
      getSigle: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    gatewayMock = {
      convertCreateDtoToEntity: jest.fn(),
    };

    presenterMock = {
      convertEntityToResponseDto: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryAdapterController,
        { provide: ICategoryUseCase, useValue: useCaseMock },
        { provide: ICategoryData, useValue: gatewayMock },
        { provide: GategoryPresenter, useValue: presenterMock },
      ],
    }).compile();

    controller = module.get<CategoryAdapterController>(
      CategoryAdapterController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('save', () => {
    it('should save a category and return the response DTO', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'Bebidas',
        description: 'Categoria de bebidas',
      };
      const categoryEntity = {
        id: 1,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
      };
      const categoryDto: CategoryDto = {
        id: 1,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
      };

      (gatewayMock.convertCreateDtoToEntity as jest.Mock).mockReturnValue(
        categoryEntity,
      );
      (useCaseMock.save as jest.Mock).mockResolvedValue(categoryEntity);
      (presenterMock.convertEntityToResponseDto as jest.Mock).mockReturnValue(
        categoryDto,
      );

      const result = await controller.save(createCategoryDto);

      expect(gatewayMock.convertCreateDtoToEntity).toHaveBeenCalledWith(
        createCategoryDto,
      );
      expect(useCaseMock.save).toHaveBeenCalledWith(categoryEntity);
      expect(presenterMock.convertEntityToResponseDto).toHaveBeenCalledWith(
        categoryEntity,
      );
      expect(result).toEqual(categoryDto);
    });
  });

  describe('get', () => {
    it('should get a category by id and return the response DTO', async () => {
      const categoryId = 1;
      const categoryEntity = {
        id: categoryId,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
      };
      const categoryDto: CategoryDto = {
        id: categoryId,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
      };

      (useCaseMock.get as jest.Mock).mockResolvedValue(categoryEntity);
      (presenterMock.convertEntityToResponseDto as jest.Mock).mockReturnValue(
        categoryDto,
      );

      const result = await controller.get(categoryId);

      expect(useCaseMock.get).toHaveBeenCalledWith(categoryId);
      expect(presenterMock.convertEntityToResponseDto).toHaveBeenCalledWith(
        categoryEntity,
      );
      expect(result).toEqual(categoryDto);
    });
  });

  describe('getSigle', () => {
    it('should get a single category by id and return the response DTO', async () => {
      const categoryId = 1;
      const categoryEntity = {
        id: categoryId,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
      };
      const categoryDto: CategoryDto = {
        id: categoryId,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
      };

      (useCaseMock.getSigle as jest.Mock).mockResolvedValue(categoryEntity);
      (presenterMock.convertEntityToResponseDto as jest.Mock).mockReturnValue(
        categoryDto,
      );

      const result = await controller.getSigle(categoryId);

      expect(useCaseMock.getSigle).toHaveBeenCalledWith(categoryId);
      expect(presenterMock.convertEntityToResponseDto).toHaveBeenCalledWith(
        categoryEntity,
      );
      expect(result).toEqual(categoryDto);
    });
  });

  describe('delete', () => {
    it('should delete a category by id', async () => {
      const categoryId = 1;

      (useCaseMock.delete as jest.Mock).mockResolvedValue(undefined);

      await expect(controller.delete(categoryId)).resolves.toBeUndefined();

      expect(useCaseMock.delete).toHaveBeenCalledWith(categoryId);
    });
  });

  describe('update', () => {
    it('should update a category and return the response DTO', async () => {
      const categoryId = 1;
      const updateCategoryDto: CreateCategoryDto = {
        name: 'Bebidas',
        description: 'Categoria de bebidas atualizada',
      };
      const updatedCategoryEntity = {
        id: categoryId,
        name: 'Bebidas',
        description: 'Categoria de bebidas atualizada',
      };
      const categoryDto: CategoryDto = {
        id: categoryId,
        name: 'Bebidas',
        description: 'Categoria de bebidas atualizada',
      };

      (gatewayMock.convertCreateDtoToEntity as jest.Mock).mockReturnValue(
        updatedCategoryEntity,
      );
      (useCaseMock.update as jest.Mock).mockResolvedValue(
        updatedCategoryEntity,
      );
      (presenterMock.convertEntityToResponseDto as jest.Mock).mockReturnValue(
        categoryDto,
      );

      const result = await controller.update(categoryId, updateCategoryDto);

      expect(gatewayMock.convertCreateDtoToEntity).toHaveBeenCalledWith(
        updateCategoryDto,
      );
      expect(useCaseMock.update).toHaveBeenCalledWith(
        categoryId,
        updatedCategoryEntity,
      );
      expect(presenterMock.convertEntityToResponseDto).toHaveBeenCalledWith(
        updatedCategoryEntity,
      );
      expect(result).toEqual(categoryDto);
    });
  });
});
