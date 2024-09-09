import { Injectable } from '@nestjs/common';
import { IProductData } from 'src/application/product/interfaces/IProductData';
import { IProductUseCase } from 'src/application/product/interfaces/IProductUseCase';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductAdapterController {
  constructor(
    private readonly useCase: IProductUseCase,
    private gateway: IProductData,
  ) {}

  async create(productDto: CreateProductDto) {
    const product = this.gateway.convertDtoToEntity(productDto);
    await this.useCase.save(product);
  }

  findOne(id: number) {
    return this.useCase.get(id);
  }

  findAllByCategory(id: number) {
    return this.useCase.findAllByCategory(id);
  }

  update(id: number, productDto: CreateProductDto) {
    const product = this.gateway.convertDtoToEntity(productDto);
    return this.useCase.update(id, product);
  }

  async remove(id: number) {
    return await this.useCase.delete(id);
  }
}
