import { Provider } from '@nestjs/common';
import { OrderService } from 'src/application/order/core/service/OrderService';
import { OrderServicePort } from 'src/application/order/ports/input/OrderServicePort';

export const OrderInput: Provider[] = [
  {
    provide: OrderServicePort,
    useClass: OrderService,
  },
];
