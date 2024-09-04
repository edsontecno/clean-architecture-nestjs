import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './Category.entity';
import { Category } from 'src/application/category/core/domain/Category';
import { CategoryPersistPort } from 'src/application/category/ports/output/CategoryPersistPort';

export class CategoryPersistAdapter implements CategoryPersistPort {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}
  async save(category: Category): Promise<number> {
    const entity = new CategoryEntity();
    Object.assign(entity, category);
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
    const category = new Category();
    Object.assign(category, categoryEntity);
    return category;
  }
  async getSigle(id: number): Promise<Category> {
    const categoryEntity = await this.repository.findOneBy({ id });
    const category = new Category();
    Object.assign(category, categoryEntity);
    return category;
  }
  async delete(id: number): Promise<void> {
    const entity = await this.get(id);
    this.repository.delete(entity.id);
  }
  async update(id: number, category: Category): Promise<Category> {
    const entity = new CategoryEntity();
    const categorySearched = await this.get(id);
    Object.assign(entity, categorySearched);
    Object.assign(entity, category);
    await this.repository.save(entity);
    return categorySearched;
  }
}
