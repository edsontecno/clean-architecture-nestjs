import { CreateProductDto } from 'src/adapters/product/dto/create-product.dto';
import { Product } from '../entities/Product';

export abstract class IProductData {
  abstract save(product: Product): Promise<Product>;
  abstract get(id: number): Promise<Product>;
  abstract delete(id: number): Promise<void>;
  abstract update(id: number, product: Product): Promise<Product>;
  abstract findAllByCategory(idCategory: number): Promise<Product[]>;
  abstract convertDtoToEntity(dto: CreateProductDto): Product;
}
