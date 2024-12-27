import { Test, TestingModule } from '@nestjs/testing';
import { Category } from '../entites/Category';
import { ICategoryData } from '../interfaces/ICategoryData';
import { CategoryUseCase } from './CategoryUseCase';
import { BusinessRuleException } from '../../../system/filtros/business-rule-exception';

describe('CategoryUseCase', () => {
  let useCase: CategoryUseCase;
  let persistMock: Partial<ICategoryData>;

  beforeEach(async () => {
    persistMock = {
      save: jest.fn(),
      get: jest.fn(),
      getSigle: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryUseCase,
        { provide: ICategoryData, useValue: persistMock },
      ],
    }).compile();

    useCase = module.get<CategoryUseCase>(CategoryUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('save', () => {
    it('should save a category if fields are valid', async () => {
      const category: Category = {
        id: 1,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
        products: [],
      };

      (persistMock.save as jest.Mock).mockResolvedValue(category);

      const result = await useCase.save(category);

      expect(persistMock.save).toHaveBeenCalledWith(category);
      expect(result).toEqual(category);
    });

    // it('should throw an error if a field is missing', async () => {
    //   const category: Category = {
    //     id: 1,
    //     name: '',
    //     description: 'Categoria de bebidas',
    //     products: [],
    //   };

    //   await expect(useCase.save(category)).rejects.toThrow(
    //     new BusinessRuleException('Campo nome é de preenchimento obrigatório'),
    //   );
    // });
  });

  describe('get', () => {
    it('should return a category if it exists', async () => {
      const category: Category = {
        id: 1,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
        products: [],
      };

      (persistMock.get as jest.Mock).mockResolvedValue(category);

      const result = await useCase.get(1);

      expect(persistMock.get).toHaveBeenCalledWith(1);
      expect(result).toEqual(category);
    });

    it('should throw an error if the category does not exist', async () => {
      (persistMock.get as jest.Mock).mockResolvedValue(null);

      await expect(useCase.get(1)).rejects.toThrow(
        'Não foi possível encontrar a categoria informada',
      );
    });
  });

  describe('getSigle', () => {
    it('should return a single category if it exists', async () => {
      const category: Category = {
        id: 1,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
        products: [],
      };

      (persistMock.getSigle as jest.Mock).mockResolvedValue(category);

      const result = await useCase.getSigle(1);

      expect(persistMock.getSigle).toHaveBeenCalledWith(1);
      expect(result).toEqual(category);
    });

    it('should throw an error if the category does not exist', async () => {
      (persistMock.getSigle as jest.Mock).mockResolvedValue(null);

      await expect(useCase.getSigle(1)).rejects.toThrow(
        'Não foi possível encontrar a categoria informada',
      );
    });
  });

  describe('delete', () => {
    it('should delete a category if it has no products', async () => {
      const category: Category = {
        id: 1,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
        products: [],
      };

      (persistMock.get as jest.Mock).mockResolvedValue(category);

      await useCase.delete(1);

      expect(persistMock.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the category has products', async () => {
      const category: Category = {
        id: 1,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
        products: [
          {
            id: 1,
            name: 'Produto',
            description: 'Descrição',
            image: undefined,
            price: 10.0,
            category: 1,
          },
        ],
      };

      (persistMock.get as jest.Mock).mockResolvedValue(category);

      await expect(useCase.delete(1)).rejects.toThrow(
        'Não é possível deletar categoria com produtos vinculados',
      );
    });
  });

  describe('update', () => {
    it('should update a category if fields are valid', async () => {
      const category: Category = {
        id: 1,
        name: 'Bebidas',
        description: 'Categoria de bebidas',
        products: [],
      };

      (persistMock.update as jest.Mock).mockResolvedValue(category);

      const result = await useCase.update(1, category);

      expect(persistMock.update).toHaveBeenCalledWith(1, category);
      expect(result).toEqual(category);
    });

    // it('should throw an error if a field is missing', async () => {
    //   const category: Category = {
    //     id: 1,
    //     name: '',
    //     description: 'Categoria de bebidas',
    //     products: [],
    //   };

    //   await expect(useCase.update(1, category)).rejects.toThrow(
    //     new BusinessRuleException('Campo nome é de preenchimento obrigatório'),
    //   );
    // });
  });
});
