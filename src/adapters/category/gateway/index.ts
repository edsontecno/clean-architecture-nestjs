import { Provider } from '@nestjs/common';
import { CategoryGateway } from './CategoryGateway';
import { ICategoryData } from '../../../application/category/interfaces/ICategoryData';

export const CategoryOutput: Provider[] = [
  {
    provide: ICategoryData,
    useClass: CategoryGateway,
  },
];
