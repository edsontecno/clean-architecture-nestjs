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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ProductAdapterController } from 'src/adapters/product/controller/ProductAdapterController';
import { Product } from 'src/application/product/entities/Product';
import { ErrorResponseBody } from 'src/system/filtros/filter-exception-global';
import { AuthGuard } from 'src/system/guards/authGuard';
import { CreateProductDto } from '../../adapters/product/dto/create-product.dto';

@Controller('product')
@ApiTags('Produto')
@ApiBadRequestResponse({
  description: 'Detalhe do erro',
  type: ErrorResponseBody,
})
@ApiInternalServerErrorResponse({ description: 'Erro do servidor' })
@UseGuards(AuthGuard)
@ApiBearerAuth('user')
export class ProductController {
  constructor(private readonly adapter: ProductAdapterController) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar produto' })
  @ApiResponse({
    status: 201,
    description: 'produto salvo',
  })
  @ApiBody({
    type: CreateProductDto,
    examples: {
      example1: {
        summary: 'Produto 1',
        value: {
          name: 'Doce de leite',
          description: 'Doce de leite da fazenda',
          price: 5.99,
          image: '',
          category: 1,
        },
      },
      example2: {
        summary: 'Produto 2',
        value: {
          name: 'Batata frita',
          description: 'Batata frita crocante',
          price: 3.99,
          image: '',
          category: 1,
        },
      },
    },
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
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Consultar Produto',
    examples: {
      Produto1: {
        value: 1,
      },
      Produto2: {
        value: 2,
      },
    },
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
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Consultar Produto por categoria',
    examples: {
      Categoria1: {
        value: 1,
      },
      Categoria2: {
        value: 2,
      },
    },
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
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Consultar Produto',
    examples: {
      Produto1: {
        value: 1,
      },
      Produto2: {
        value: 2,
      },
    },
  })
  @ApiBody({
    type: CreateProductDto,
    examples: {
      example1: {
        summary: 'Produto 1',
        value: {
          name: 'Doce de leite',
          description: 'Doce de leite da fazenda',
          price: 5.99,
          image: '',
          category: 1,
        },
      },
      example2: {
        summary: 'Produto 2',
        value: {
          name: 'Batata frita',
          description: 'Batata frita crocante',
          price: 3.99,
          image: '',
          category: 1,
        },
      },
    },
  })
  update(@Param('id') id: number, @Body() productDto: CreateProductDto) {
    return this.adapter.update(id, productDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir produto por id' })
  @ApiResponse({
    status: 204,
    description: 'Excluir produto por id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Consultar Produto',
    examples: {
      Produto1: {
        value: 1,
      },
      Produto2: {
        value: 2,
      },
    },
  })
  async remove(@Param('id') id: number, @Res() response: Response) {
    await this.adapter.remove(id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
