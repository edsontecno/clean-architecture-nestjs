import { Order } from 'src/application/order/core/domain/Order';

export class Customer {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly cpf: string;
  readonly orders: Order[];
}
