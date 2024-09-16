import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryOutput } from '../../adapters/category/gateway';
import { CategoryInput } from '.';
import { CategoryEntity } from '../../adapters/category/gateway/Category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryAdapterController } from 'src/adapters/category/controller/CategoryAdapterController';
import { GategoryPresenter } from 'src/adapters/category/presenter/CategoryPresenter';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [
    ...CategoryOutput,
    ...CategoryInput,
    {
      provide: CategoryAdapterController,
      useClass: CategoryAdapterController,
    },
    {
      provide: GategoryPresenter,
      useClass: GategoryPresenter,
    },
  ],
  exports: [...CategoryOutput, ...CategoryInput],
})
export class CategoryModule {}
