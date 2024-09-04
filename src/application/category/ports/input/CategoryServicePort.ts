import { Category } from '../../core/domain/Category';

export abstract class CategoryServicePort {
  abstract save(category: Category): Promise<number>;
  abstract get(id: number): Promise<Category>;
  abstract getSigle(id: number): Promise<Category>;
  abstract delete(id: number): Promise<void>;
  abstract update(id: number, category: Category): Promise<Category>;
}
