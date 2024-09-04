import { Injectable } from '@nestjs/common';
import { Product } from 'src/application/product/entities/Product';
import { IProductUseCase } from 'src/application/product/interfaces/IProductUseCase';
import { CreateProductDto } from 'src/drivers/product/create-product.dto';

@Injectable()
export class ProductAdapterController {
  constructor(private readonly useCase: IProductUseCase) {}

  async create(productDto: CreateProductDto) {
    const product = new Product();
    Object.assign(product, productDto);
    await this.useCase.save(product);
  }

  findOne(id: number) {
    return this.useCase.get(id);
  }

  findAllByCategory(id: number) {
    return this.useCase.findAllByCategory(id);
  }

  update(id: number, productDto: CreateProductDto) {
    const product = new Product();
    Object.assign(product, productDto);
    return this.useCase.update(id, product);
  }

  async remove(id: number) {
    return await this.useCase.delete(id);
  }
}
