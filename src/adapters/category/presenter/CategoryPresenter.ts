import { Injectable } from '@nestjs/common';
import { Category } from 'src/application/category/entites/Category';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class GategoryPresenter {
  convertEntityToResponseDto(entity: Category): CategoryDto {
    const response = new CategoryDto();
    response.id = entity.id;
    response.name = entity.name;
    response.description = entity.description;
    return response;
  }
}
