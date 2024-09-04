import { Injectable } from '@nestjs/common';
import { ICategoryUseCase } from '../interfaces/ICategoryUseCase';
import { Category } from '../entites/Category';
import { ICategoryData } from '../interfaces/ICategoryData';
import { Service } from 'src/application/service/service';
import { BusinessRuleException } from 'src/system/filtros/business-rule-exception';

@Injectable()
export class CategoryUseCase extends Service implements ICategoryUseCase {
  constructor(private persist: ICategoryData) {
    super();
  }

  save(category: Category): Promise<number> {
    this.checkFields(category);
    return this.persist.save(category);
  }

  private checkFields(category: Category) {
    this.validField(category.name, 'nome');
    this.validField(category.description, 'descrição');
  }

  async get(id: number): Promise<Category> {
    const category = await this.persist.get(id);
    this.checkField(
      category.id,
      'Não foi possível encontrar a categoria informada',
    );
    return category;
  }
  async getSigle(id: number): Promise<Category> {
    const category = await this.persist.getSigle(id);
    this.checkField(
      category.id,
      'Não foi possível encontrar a categoria informada',
    );
    return category;
  }

  async delete(id: number): Promise<void> {
    const category = await this.get(id);

    if (category.products.length > 0) {
      throw new BusinessRuleException(
        'Não é possível deletar categoria com produtos vinculados',
      );
    }
    return await this.persist.delete(id);
  }

  update(id: number, category: Category): Promise<Category> {
    this.checkFields(category);
    return this.persist.update(id, category);
  }
}
