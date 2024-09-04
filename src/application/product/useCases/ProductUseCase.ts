import { Injectable } from '@nestjs/common';
import { IProductUseCase } from '../interfaces/IProductUseCase';
import { Product } from '../entities/Product';
import { IProductData } from '../interfaces/IProductData';
import { BusinessRuleException } from 'src/system/filtros/business-rule-exception';
import { Service } from 'src/application/service/service';
import { ICategoryUseCase } from 'src/application/category/interfaces/ICategoryUseCase';

@Injectable()
export class ProductUseCase extends Service implements IProductUseCase {
  constructor(
    private persist: IProductData,
    private categoryService: ICategoryUseCase,
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
