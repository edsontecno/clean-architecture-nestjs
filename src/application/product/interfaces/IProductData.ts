import { Product } from '../entities/Product';

export abstract class IProductData {
  abstract save(product: Product): Promise<number>;
  abstract get(id: number): Promise<Product>;
  abstract delete(id: number): Promise<void>;
  abstract update(id: number, product: Product): Promise<Product>;
  abstract findAllByCategory(idCategory: number): Promise<Product[]>;
}
