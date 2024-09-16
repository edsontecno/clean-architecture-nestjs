import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ProductAdapterController } from 'src/adapters/product/controller/ProductAdapterController';
import { Product } from 'src/application/product/entities/Product';
import { ErrorResponseBody } from 'src/system/filtros/filter-exception-global';
import { CreateProductDto } from '../../adapters/product/dto/create-product.dto';

@Controller('product')
@ApiTags('Produto')
@ApiBadRequestResponse({
  description: 'Detalhe do erro',
  type: ErrorResponseBody,
})
@ApiInternalServerErrorResponse({ description: 'Erro do servidor' })
export class ProductController {
  constructor(private readonly adapter: ProductAdapterController) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar produto' })
  @ApiResponse({
    status: 201,
    description: 'produto salvo',
  })
  async create(@Body() productDto: CreateProductDto) {
    const product = new Product(
      null,
      productDto.name,
      productDto.description,
      productDto.price,
      productDto.image,
      productDto.category,
    );
    Object.assign(product, productDto);
    return await this.adapter.create(product);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar product por id' })
  @ApiResponse({
    status: 200,
    description: 'Consultar product por id',
    type: CreateProductDto,
  })
  findOne(@Param('id') id: number) {
    return this.adapter.findOne(id);
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
    // const product = new Product(
    //   id,
    //   productDto.name,
    //   productDto.description,
    //   productDto.image,
    //   productDto.price,
    //   productDto.category,
    // );
    // Object.assign(product, productDto);
    return this.adapter.update(id, productDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir produto por id' })
  @ApiResponse({
    status: 204,
    description: 'Excluir produto por id',
  })
  async remove(@Param('id') id: number, @Res() response: Response) {
    await this.adapter.remove(id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
