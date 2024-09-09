import { InjectRepository } from '@nestjs/typeorm';
import { IProductData } from 'src/application/product/interfaces/IProductData';
import { QueryFailedError, Repository } from 'typeorm';
import { Product } from 'src/application/product/entities/Product';
import { ProductEntity } from './Product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

export class ProductGateway implements IProductData {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async save(product: Product): Promise<number> {
    const entity = new ProductEntity();
    Object.assign(entity, product);
    await this.repository.save(entity);
    return entity.id;
  }
  async get(id: number): Promise<Product> {
    const entity = await this.repository.findOneBy({ id });
    const product = new Product();
    Object.assign(product, entity);
    return product;
  }
  getEntity(id: number): Promise<ProductEntity> {
    return this.repository.findOneBy({ id });
  }
  async delete(id: number): Promise<void> {
    try {
      const entity = await this.getEntity(id);
      await this.repository.delete(entity.id);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('violates foreign key constraint')
      ) {
        throw new Error('PRODUTO_VINCULADO');
      }
    }
  }
  async update(id: number, product: Product): Promise<Product> {
    const entity = await this.getEntity(id);
    Object.assign(entity, product);
    await this.repository.save(entity);
    return product;
  }
  async findAllByCategory(idCategory: number): Promise<Product[]> {
    const result = [];
    const list = await this.repository.find({
      where: { category: { id: idCategory } },
    });
    list.forEach((element) => {
      const newProduct = new Product();
      Object.assign(newProduct, element);
      result.push(newProduct);
    });
    return result;
  }

  convertDtoToEntity(dto: CreateProductDto): Product {
    const product = new Product();
    Object.assign(product, dto);
    return product;
  }
}
