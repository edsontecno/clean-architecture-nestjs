import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Product } from 'src/application/product/core/domain/Product';
import { ProductServicePort } from 'src/application/product/ports/input/ProductServicePort';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseBody } from 'src/filtros/filter-exception-global';
import { Response } from 'express';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
@ApiTags('Produto')
@ApiBadRequestResponse({
  description: 'Detalhe do erro',
  type: ErrorResponseBody,
})
@ApiInternalServerErrorResponse({ description: 'Erro do servidor' })
export class ProductController {
  constructor(private readonly adapter: ProductServicePort) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar produto' })
  @ApiResponse({
    status: 201,
    description: 'produto salvo',
  })
  async create(@Body() productDto: CreateProductDto) {
    const product = new Product();
    Object.assign(product, productDto);
    await this.adapter.save(product);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar product por id' })
  @ApiResponse({
    status: 200,
    description: 'Consultar product por id',
    type: CreateProductDto,
  })
  findOne(@Param('id') id: number) {
    return this.adapter.get(id);
  }

  @Get('/category/:id')
  @ApiOperation({ summary: 'Consultar produto por categoria' })
  @ApiResponse({
    status: 200,
    description: 'Consultar produto por categoria',
    type: [CreateProductDto],
  })
  findAllByCategory(@Param('id') id: number) {
    return this.adapter.findAllByCategory(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar produto por id' })
  @ApiResponse({
    status: 200,
    description: 'Atualizar produto',
    type: CreateProductDto,
  })
  update(@Param('id') id: number, @Body() productDto: CreateProductDto) {
    const product = new Product();
    Object.assign(product, productDto);
    return this.adapter.update(id, product);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir produto por id' })
  @ApiResponse({
    status: 204,
    description: 'Excluir produto por id',
  })
  async remove(@Param('id') id: number, @Res() response: Response) {
    await this.adapter.delete(id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
