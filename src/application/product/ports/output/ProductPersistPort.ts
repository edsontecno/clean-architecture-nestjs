import { Product } from '../../core/domain/Product';

export abstract class ProductPersistPort {
  abstract save(product: Product): Promise<number>;
  abstract get(id: number): Promise<Product>;
  abstract delete(id: number): Promise<void>;
  abstract update(id: number, product: Product): Promise<Product>;
  abstract findAllByCategory(idCategory: number): Promise<Product[]>;
}
