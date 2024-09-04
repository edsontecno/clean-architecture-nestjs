import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInput } from './input';
import { ProductController } from './input/product.controller';
import { ProductOutput } from './output';
import { CategoryServicePort } from '../../application/category/ports/input/CategoryServicePort';
import { CategoryPersistAdapter } from '../category/output/CategoryPersitAdapter';
import { CategoryEntity } from '../category/output/Category.entity';
import { CategoryService } from 'src/application/category/core/service/CategoryService';
import { CategoryPersistPort } from 'src/application/category/ports/output/CategoryPersistPort';
import { ProductEntity } from './output/Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity])],
  controllers: [ProductController],
  providers: [
    ...ProductOutput,
    ...ProductInput,
    {
      provide: CategoryServicePort,
      useClass: CategoryService,
    },
    {
      provide: CategoryPersistPort,
      useClass: CategoryPersistAdapter,
    },
  ],
  exports: [
    ...ProductOutput,
    ...ProductInput,
    {
      provide: CategoryServicePort,
      useClass: CategoryService,
    },
    {
      provide: CategoryPersistPort,
      useClass: CategoryPersistAdapter,
    },
  ],
})
export class ProductModule {}
