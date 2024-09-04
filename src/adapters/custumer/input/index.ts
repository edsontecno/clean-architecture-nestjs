import { Provider } from '@nestjs/common';
import { CustomerService } from 'src/application/custumer/core/service/CustomerService';
import { CustomerServicePort } from 'src/application/custumer/ports/input/CustomerServicePort';

export const Services: Provider[] = [
  {
    provide: CustomerServicePort,
    useClass: CustomerService,
  },
];
