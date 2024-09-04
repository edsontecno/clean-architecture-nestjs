import { OrderEntity } from '../../order/output/Order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clientes' })
export class CustomerEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nome', length: 100, nullable: false })
  name: string;

  @Column({ name: 'email', length: 200, nullable: false })
  email: string;

  @Column({ name: 'cpf', length: 11, nullable: false, unique: true })
  cpf: string;

  @OneToMany(() => OrderEntity, (order) => order.customer, {
    cascade: true,
  })
  orders: OrderEntity[];
}
