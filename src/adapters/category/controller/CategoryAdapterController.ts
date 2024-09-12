import { Injectable } from '@nestjs/common';
import { Category } from 'src/application/category/entites/Category';
import { ICategoryUseCase } from 'src/application/category/interfaces/ICategoryUseCase';
import { CreateCategoryDto } from 'src/adapters/category/dto/create-category.dto';
import { ICategoryData } from 'src/application/category/interfaces/ICategoryData';

@Injectable()
export class CategoryAdapterController {
  constructor(
    private readonly useCase: ICategoryUseCase,
    private gateway: ICategoryData,
  ) {}

  save(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.gateway.convertCreateDtoToEntity(createCategoryDto);
    return this.useCase.save(category);
  }

  async get(id: number): Promise<Category> {
    return this.useCase.get(id);
  }
  async getSigle(id: number): Promise<Category> {
    return this.useCase.getSigle(id);
  }

  async delete(id: number): Promise<void> {
    return this.useCase.delete(id);
  }

  update(id: number, dto: CreateCategoryDto): Promise<Category> {
    const category = this.gateway.convertCreateDtoToEntity(dto);
    return this.useCase.update(id, category);
  }
}
