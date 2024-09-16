import { ProductEntity } from 'src/adapters/product/gateway/Product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductData } from 'src/application/product/interfaces/IProductData';
import { QueryFailedError, Repository } from 'typeorm';
import { Product } from 'src/application/product/entities/Product';
import { CreateProductDto } from '../dto/create-product.dto';

export class ProductGateway implements IProductData {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async save(product: Product): Promise<Product> {
    const entity = new ProductEntity();
    Object.assign(entity, product);
    await this.repository.save(entity);
    return this.convertDataToEntity(entity);
  }
  async get(id: number): Promise<Product> {
    const entity = await this.repository.findOneBy({ id });
    return this.convertDataToEntity(entity);
  }

  private getEntity(id: number): Promise<ProductEntity> {
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
    entity.id = parseInt(id.toString());
    await this.repository.save(entity);
    return this.convertDataToEntity(entity);
  }
  async findAllByCategory(idCategory: number): Promise<Product[]> {
    const result = [];
    const list = await this.repository.find({
      where: { category: { id: idCategory } },
    });
    list.forEach((element) => {
      const newProduct = new Product(
        element.id,
        element.name,
        element.description,
        element.price,
        element.image,
        element.category,
      );
      result.push(newProduct);
    });
    return result;
  }

  convertDtoToEntity(dto: CreateProductDto): Product {
    const product = new Product(
      null,
      dto.name,
      dto.description,
      dto.price,
      dto.image,
      dto.category,
    );
    return product;
  }

  private convertDataToEntity(productEntity: ProductEntity): Product {
    if (!productEntity) {
      return null;
    }
    const category = new Product(
      productEntity.id,
      productEntity.name,
      productEntity.description,
      productEntity.price,
      productEntity.image,
      productEntity.category,
    );
    return category;
  }
}
