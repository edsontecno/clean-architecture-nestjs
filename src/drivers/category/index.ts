import { Provider } from '@nestjs/common';
import { CategoryUseCase } from '../../application/category/useCases/CategoryUseCase';
import { ICategoryUseCase } from '../../application/category/interfaces/ICategoryUseCase';

export const CategoryInput: Provider[] = [
  {
    provide: ICategoryUseCase,
    useClass: CategoryUseCase,
  },
];
