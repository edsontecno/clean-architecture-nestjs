import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CategoryAdapterController } from '../../adapters/category/controller/CategoryAdapterController';
import { CategoryEntity } from '../../adapters/category/gateway/Category.entity';
import { GategoryPresenter } from '../../adapters/category/presenter/CategoryPresenter';
import { ICategoryUseCase } from '../../application/category/interfaces/ICategoryUseCase';
import { CategoryUseCase } from '../../application/category/useCases/CategoryUseCase';
import { CategoryController } from './category.controller';

describe('CategoryModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        // Mocka o TypeOrmModule com a entidade CategoryEntity
        TypeOrmModule.forFeature([CategoryEntity]),
      ],
      controllers: [CategoryController],
      providers: [
        {
          provide: DataSource,
          useValue: {}, // Mock do DataSource para evitar dependências reais
        },
        {
          provide: 'ICategoryData',
          useValue: {}, // Mock do CategoryOutput
        },
        {
          provide: ICategoryUseCase,
          useClass: CategoryUseCase, // Mock do CategoryInput
        },
        {
          provide: CategoryAdapterController,
          useClass: CategoryAdapterController, // Controller do Adapter
        },
        {
          provide: GategoryPresenter,
          useClass: GategoryPresenter, // Presenter
        },
        {
          provide: DataSource, // Mock do DataSource
          useValue: {
            getRepository: jest.fn(), // Mocka o método getRepository
          },
        },
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
