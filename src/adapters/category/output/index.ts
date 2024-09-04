import { Provider } from '@nestjs/common';
import { CategoryPersistAdapter } from './CategoryPersitAdapter';
import { CategoryPersistPort } from 'src/application/category/ports/output/CategoryPersistPort';

export const CategoryOutput: Provider[] = [
  {
    provide: CategoryPersistPort,
    useClass: CategoryPersistAdapter,
  },
];
