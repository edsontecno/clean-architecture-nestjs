import { Order } from 'src/application/order/entities/Order';

export class Customer {
  id: number;
  name: string;
  email: string;
  cpf: string;
  orders: Order[];
}
