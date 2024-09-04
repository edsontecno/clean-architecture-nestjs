import { Module } from '@nestjs/common';
import { CategoryController } from './input/category.controller';
import { CategoryOutput } from './output';
import { CategoryInput } from './input';
import { CategoryEntity } from './output/Category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [...CategoryOutput, ...CategoryInput],
  exports: [...CategoryOutput, ...CategoryInput],
})
export class CategoryModule {}
