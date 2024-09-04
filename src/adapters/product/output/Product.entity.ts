import { CategoryEntity } from '../../category/output/Category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'produtos' })
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nome', length: 100, nullable: false })
  name: string;

  @Column({ name: 'descricao', length: 500, nullable: false })
  description: string;

  @Column({
    name: 'preco',
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({ name: 'imagem', type: 'text', nullable: true })
  image: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'categoriaId' })
  category: CategoryEntity;
}
