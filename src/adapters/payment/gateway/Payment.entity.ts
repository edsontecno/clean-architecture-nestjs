import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentStatus } from './PaymentStatus';

@Entity({ name: 'pagamentos' })
export class PaymentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'valor',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  amount: number;

  @Column({ name: 'descricao', nullable: false })
  descritpion: string;

  @Column({ name: 'qrcode', nullable: true })
  qrcode: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.Pending,
  })
  status: string;

  @Column({ name: 'mp_id', nullable: true })
  mp_id: number;
}
