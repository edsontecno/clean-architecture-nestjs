import { Provider } from '@nestjs/common';
import { CustomerPersistAdapter } from './CustomerPersitAdapter';
import { CustomerPersistPort } from 'src/application/custumer/ports/output/CustomerPersistPort';

export const ServicesOutput: Provider[] = [
  {
    provide: CustomerPersistPort,
    useClass: CustomerPersistAdapter,
  },
];
