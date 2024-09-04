import { Category } from '../entites/Category';

export abstract class ICategoryUseCase {
  abstract save(category: Category): Promise<number>;
  abstract get(id: number): Promise<Category>;
  abstract getSigle(id: number): Promise<Category>;
  abstract delete(id: number): Promise<void>;
  abstract update(id: number, category: Category): Promise<Category>;
}
