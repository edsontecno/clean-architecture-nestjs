import { Product } from 'src/application/product/entities/Product';

export class Category {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly products: Product[];
}
