import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/adapters/category/dto/create-category.dto';
import { ICategoryData } from 'src/application/category/interfaces/ICategoryData';
import { ICategoryUseCase } from 'src/application/category/interfaces/ICategoryUseCase';
import { CategoryDto } from '../dto/category.dto';
import { GategoryPresenter } from '../presenter/CategoryPresenter';

@Injectable()
export class CategoryAdapterController {
  constructor(
    private readonly useCase: ICategoryUseCase,
    private gateway: ICategoryData,
    private presenter: GategoryPresenter,
  ) {}

  async save(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const category = this.gateway.convertCreateDtoToEntity(createCategoryDto);
    const entity = await this.useCase.save(category);
    return this.presenter.convertEntityToResponseDto(entity);
  }

  async get(id: number): Promise<CategoryDto> {
    const entity = await this.useCase.get(id);
    return this.presenter.convertEntityToResponseDto(entity);
  }
  async getSigle(id: number): Promise<CategoryDto> {
    const entity = await this.useCase.getSigle(id);
    return this.presenter.convertEntityToResponseDto(entity);
  }

  async delete(id: number): Promise<void> {
    return this.useCase.delete(id);
  }

  async update(id: number, dto: CreateCategoryDto): Promise<CategoryDto> {
    const category = this.gateway.convertCreateDtoToEntity(dto);
    const entity = await this.useCase.update(id, category);
    return this.presenter.convertEntityToResponseDto(entity);
  }
}
