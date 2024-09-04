import { Provider } from '@nestjs/common';
import { ProductService } from 'src/application/product/core/service/ProductService';
import { ProductServicePort } from 'src/application/product/ports/input/ProductServicePort';

export const ProductInput: Provider[] = [
  {
    provide: ProductServicePort,
    useClass: ProductService,
  },
];
