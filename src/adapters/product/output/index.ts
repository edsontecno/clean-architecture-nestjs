import { Provider } from '@nestjs/common';
import { ProductPersistPort } from 'src/application/product/ports/output/ProductPersistPort';
import { ProductPersistAdapter } from './ProductPersitAdapter';

export const ProductOutput: Provider[] = [
  {
    provide: ProductPersistPort,
    useClass: ProductPersistAdapter,
  },
];
