import { ProductEntity } from 'src/adapters/product/output/Product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categorias' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nome', length: 100, nullable: false })
  name: string;

  @Column({ name: 'descricao', length: 500, nullable: false })
  description: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
