import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/application/category/entites/Category';
import { ICategoryData } from 'src/application/category/interfaces/ICategoryData';
import { Product } from 'src/application/product/entities/Product';
import { BusinessRuleException } from 'src/system/filtros/business-rule-exception';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryEntity } from './Category.entity';

export class CategoryGateway implements ICategoryData {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}

  async save(category: Category): Promise<Category> {
    const entity = this.convertEntityTodata(category);
    await this.repository.save(entity);
    return this.convertDataToEntity(entity);
  }

  async get(id: number): Promise<Category> {
    const categoryEntity = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['products'],
    });
    if (!categoryEntity) {
      throw new BusinessRuleException('Categoria não localizada');
    }
    const category = this.convertDataToEntity(categoryEntity);
    return category;
  }

  async getSigle(id: number): Promise<Category> {
    const categoryEntity = await this.getCategoryEntity(id);
    const category = this.convertDataToEntity(categoryEntity);
    return category;
  }

  private async getCategoryEntity(id: number) {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new BusinessRuleException('Categoria não localizada');
    }
    return entity;
  }

  async delete(id: number): Promise<void> {
    const entity = await this.get(id);
    this.repository.delete(entity.id);
  }

  async update(id: number, category: Category): Promise<Category> {
    const entity = await this.getCategoryEntity(id);
    entity.name = category.name;
    entity.description = category.description;
    await this.repository.save(entity);
    const categoryResult = this.convertDataToEntity(entity);
    return categoryResult;
  }

  private convertEntityTodata(category: Category) {
    const entity = new CategoryEntity();
    entity.name = category.name;
    entity.description = category.description;
    return entity;
  }

  private convertDataToEntity(categoryEntity: CategoryEntity): Category {
    if (!categoryEntity) {
      return null;
    }
    const produts = [];
    if (categoryEntity.products) {
      categoryEntity.products.forEach((product) => {
        produts.push(
          new Product(
            product.id,
            product.name,
            product.description,
            product.price,
            product.image,
            product.category.id,
          ),
        );
      });
    }
    const category = new Category(
      categoryEntity.id,
      categoryEntity.name,
      categoryEntity.description,
      produts,
    );
    return category;
  }

  convertCreateDtoToEntity(dto: CreateCategoryDto): Category {
    const category = new Category(null, dto.name, dto.description, null);
    return category;
  }
}
