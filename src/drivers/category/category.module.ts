import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryOutput } from '../../adapters/category/gateway';
import { CategoryInput } from '.';
import { CategoryEntity } from '../../adapters/category/gateway/Category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryAdapterController } from 'src/adapters/category/controller/CategoryAdapterController';

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
  ],
  exports: [...CategoryOutput, ...CategoryInput],
})
export class CategoryModule {}
