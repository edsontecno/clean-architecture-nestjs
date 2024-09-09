import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class CategoryDto extends CreateCategoryDto {
  @ApiProperty()
  id: number;
}
