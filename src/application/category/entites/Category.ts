import { Product } from 'src/application/product/entities/Product';

export class Category {
  id: number;
  name: string;
  description: string;
  products: Product[];

  constructor(
    id: number,
    name: string,
    description: string,
    produts: Product[],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.products = produts;
  }
}
