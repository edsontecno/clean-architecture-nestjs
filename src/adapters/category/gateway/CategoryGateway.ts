import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './Category.entity';
import { Category } from 'src/application/category/entites/Category';
import { ICategoryData } from 'src/application/category/interfaces/ICategoryData';
import { CreateCategoryDto } from '../dto/create-category.dto';

export class CategoryGateway implements ICategoryData {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}

  async save(category: Category): Promise<number> {
    const entity = this.convertDataToEntity(category);
    await this.repository.save(entity);
    return entity.id;
  }

  async get(id: number): Promise<Category> {
    const categoryEntity = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['products'],
    });
    const category = this.converteDataToEntity(categoryEntity);
    return category;
  }

  async getSigle(id: number): Promise<Category> {
    const categoryEntity = await this.getCategoryEntity(id);
    const category = this.converteDataToEntity(categoryEntity);
    return category;
  }

  private async getCategoryEntity(id: number) {
    return await this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    const entity = await this.get(id);
    this.repository.delete(entity.id);
  }

  async update(id: number, category: Category): Promise<Category> {
    const entity = await this.getCategoryEntity(id);
    Object.assign(entity, category);
    await this.repository.save(entity);
    const categoryResult = this.converteDataToEntity(entity);
    return categoryResult;
  }

  private convertDataToEntity(category: Category) {
    const entity = new CategoryEntity();
    Object.assign(entity, category);
    return entity;
  }

  private converteDataToEntity(categoryEntity: CategoryEntity): Category {
    const category = new Category();
    Object.assign(category, categoryEntity);
    return category;
  }

  convertCreateDtoToEntity(dto: CreateCategoryDto): Category {
    const category = new Category();
    Object.assign(category, dto);
    return category;
  }
}
