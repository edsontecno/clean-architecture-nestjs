import { Provider } from '@nestjs/common';
import { CategoryService } from 'src/application/category/core/service/CategoryService';
import { CategoryServicePort } from 'src/application/category/ports/input/CategoryServicePort';

export const CategoryInput: Provider[] = [
  {
    provide: CategoryServicePort,
    useClass: CategoryService,
  },
];
