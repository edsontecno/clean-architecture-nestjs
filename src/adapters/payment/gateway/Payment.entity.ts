import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pagamentos' })
export class PaymentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'valor', nullable: false })
  price: number;

  @Column({ name: 'descrição', nullable: false })
  descritpion: string;
}