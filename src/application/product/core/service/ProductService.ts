import { Injectable } from '@nestjs/common';
import { ProductServicePort } from '../../ports/input/ProductServicePort';
import { Product } from '../domain/Product';
import { ProductPersistPort } from '../../ports/output/ProductPersistPort';
import { BusinessRuleException } from 'src/filtros/business-rule-exception';
import { Service } from 'src/application/service/service';
import { CategoryPersistPort } from 'src/application/category/ports/output/CategoryPersistPort';

@Injectable()
export class ProductService extends Service implements ProductServicePort {
  constructor(
    private persist: ProductPersistPort,
    private categoryService: CategoryPersistPort,
  ) {
    super();
  }

  findAllByCategory(idCategory: number): Promise<Product[]> {
    return this.persist.findAllByCategory(idCategory);
  }

  async save(product: Product): Promise<number> {
    await this.checkFields(product);
    return this.persist.save(product);
  }

  async checkFields(product: Product): Promise<void> {
    this.validField(product.name, 'nome');
    this.validField(product.description, 'descrição');
    this.validField(product.price, 'preço');
    this.validField(product.category, 'categoria');

    const category = await this.categoryService.getSigle(product.category);
    if (category.id === undefined) {
      throw new BusinessRuleException('A categoria informada é inválida');
    }
  }

  async get(id: number): Promise<Product> {
    const product = await this.persist.get(id);
    if (product.id === undefined) {
      throw new BusinessRuleException('Produto não localizado');
    }
    return this.persist.get(id);
  }

  async delete(id: number): Promise<void> {
    try {
      await this.persist.delete(id);
    } catch (error) {
      if (error.message === 'PRODUTO_VINCULADO') {
        throw new BusinessRuleException(
          'Não é possível deletar produtos vinculados à pedidos',
        );
      }
    }
    return;
  }

  async update(id: number, product: Product): Promise<Product> {
    await this.checkFields(product);
    return this.persist.update(id, product);
  }
}
