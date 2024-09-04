import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryUseCase } from 'src/application/category/useCases/CategoryUseCase';
import { ICategoryUseCase } from '../../application/category/interfaces/ICategoryUseCase';
import { ProductController } from '../../drivers/product/product.controller';
import { ProductEntity } from 'src/adapters/product/gateway/Product.entity';
import { CategoryEntity } from 'src/adapters/category/gateway/Category.entity';
import { CategoryModule } from '../category/category.module';
import { IProductUseCase } from 'src/application/product/interfaces/IProductUseCase';
import { ProductUseCase } from 'src/application/product/useCases/ProductUseCase';
import { IProductData } from 'src/application/product/interfaces/IProductData';
import { ProductGateway } from 'src/adapters/product/gateway/ProductGateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [
    // ...ProductOutput,
    // ...ProductInput,
    {
      provide: IProductUseCase,
      useClass: ProductUseCase,
    },
    {
      provide: IProductData,
      useClass: ProductGateway,
    },
    {
      provide: ICategoryUseCase,
      useClass: CategoryUseCase,
    },
    {
      provide: CategoryUseCase,
      useClass: CategoryUseCase,
    },
  ],
  exports: [
    // ...ProductOutput,
    // ...ProductInput,
    {
      provide: ICategoryUseCase,
      useClass: CategoryUseCase,
    },
    // {
    //   provide: CategoryPersistPort,
    //   useClass: CategoryPersistAdapter,
    // },
  ],
})
export class ProductModule {}
