import { Injectable } from '@nestjs/common';
import { Category } from 'src/application/category/entites/Category';
import { ICategoryUseCase } from 'src/application/category/interfaces/ICategoryUseCase';
import { CreateCategoryDto } from 'src/drivers/category/create-category.dto';

@Injectable()
export class CategoryAdapterController {
  constructor(private readonly useCase: ICategoryUseCase) {}

  save(createCategoryDto: CreateCategoryDto): Promise<number> {
    const category = new Category();
    Object.assign(category, createCategoryDto);
    return this.useCase.save(category);
  }

  // private checkFields(category: Category) {
  //   this.validField(category.name, 'nome');
  //   this.validField(category.description, 'descrição');
  // }

  async get(id: number): Promise<Category> {
    // const category = await this.persist.get(id);
    // this.checkField(
    //   category.id,
    //   'Não foi possível encontrar a categoria informada',
    // );
    return this.useCase.get(id);
  }
  async getSigle(id: number): Promise<Category> {
    // const category = await this.persist.getSigle(id);
    // this.checkField(
    //   category.id,
    //   'Não foi possível encontrar a categoria informada',
    // );
    return this.useCase.getSigle(id);
  }

  async delete(id: number): Promise<void> {
    // const category = await this.get(id);

    // if (category.products.length > 0) {
    //   throw new BusinessRuleException(
    //     'Não é possível deletar categoria com produtos vinculados',
    //   );
    // }
    // return await this.persist.delete(id);
    return this.useCase.delete(id);
  }

  update(id: number, category: Category): Promise<Category> {
    // this.checkFields(category);
    // return this.persist.update(id, category);
    return this.useCase.update(id, category);
  }
}
