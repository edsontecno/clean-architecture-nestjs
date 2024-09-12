export class Product {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: string;
  readonly image: string;
  readonly category: number;

  constructor(id, name, description, price, image, category) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.category = category;
  }
}
