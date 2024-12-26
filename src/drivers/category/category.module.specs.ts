import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ICategoryData } from '../../application/category/interfaces/ICategoryData';
import { CategoryAdapterController } from '../../adapters/category/controller/CategoryAdapterController';
import { CategoryGateway } from '../../adapters/category/gateway/CategoryGateway';
import { GategoryPresenter } from '../../adapters/category/presenter/CategoryPresenter';
import { CategoryController } from './category.controller';
import { CategoryModule } from './category.module';

describe('CategoryModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [CategoryModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  // it('should register CategoryController', () => {
  //   const controller = module.get<CategoryController>(CategoryController);
  //   expect(controller).toBeDefined();
  // });

  // it('should register CategoryAdapterController as a provider', () => {
  //   const adapterController = module.get<CategoryAdapterController>(
  //     CategoryAdapterController,
  //   );
  //   expect(adapterController).toBeDefined();
  // });

  // it('should register GategoryPresenter as a provider', () => {
  //   const presenter = module.get<GategoryPresenter>(GategoryPresenter);
  //   expect(presenter).toBeDefined();
  // });

  // it('should import TypeOrmModule with CategoryEntity', () => {
  //   const typeOrmModule = module.get(TypeOrmModule);
  //   expect(typeOrmModule).toBeDefined();
  // });

  // it('should provide ICategoryData with CategoryGateway', () => {
  //   const categoryDataProvider = module.get<ICategoryData>(ICategoryData);
  //   expect(categoryDataProvider).toBeInstanceOf(CategoryGateway);
  // });
});
