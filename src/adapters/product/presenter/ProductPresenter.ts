import { Injectable } from '@nestjs/common';
import { Product } from 'src/application/product/entities/Product';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProdutctPresenter {
  convertEntityToResponseDto(entity: Product): CreateProductDto {
    const response = new CreateProductDto();
    response.name = entity.name;
    response.description = entity.description;
    response.image = entity.image;
    response.price = entity.price;
    response.category = entity.category;
    return response;
  }

  returnIdOfEntity(entity: Product): number {
    return entity.id;
  }
}
