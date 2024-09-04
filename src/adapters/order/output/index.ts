import { Provider } from '@nestjs/common';
import { OrderPersistAdapter } from './OrderPersitAdapter';
import { OrderPersistPort } from 'src/application/order/ports/output/OrderPersistPort';

export const OrderOutput: Provider[] = [
  {
    provide: OrderPersistPort,
    useClass: OrderPersistAdapter,
  },
];
