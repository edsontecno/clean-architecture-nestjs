import { Provider } from '@nestjs/common';
import { CategoryUseCase } from 'src/application/category/useCases/CategoryUseCase';
import { ICategoryUseCase } from 'src/application/category/interfaces/ICategoryUseCase';

export const CategoryInput: Provider[] = [
  {
    provide: ICategoryUseCase,
    useClass: CategoryUseCase,
  },
];
