import { Order } from 'src/application/order/entities/Order';

export class Customer {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly cpf: string;
  readonly orders: Order[];
}
