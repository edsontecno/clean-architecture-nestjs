import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseBody } from 'src/filtros/filter-exception-global';
import { Response } from 'express';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryServicePort } from 'src/application/category/ports/input/CategoryServicePort';
import { Category } from 'src/application/category/core/domain/Category';

@ApiTags('Categoria')
@ApiBadRequestResponse({
  description: 'Detalhe do erro',
  type: ErrorResponseBody,
})
@ApiInternalServerErrorResponse({ description: 'Erro do servidor' })
@Controller('category')
export class CategoryController {
  constructor(private readonly adapter: CategoryServicePort) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar categoria' })
  @ApiResponse({
    status: 201,
    description: 'Cadastro de categoria',
  })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    Object.assign(category, createCategoryDto);
    await this.adapter.save(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar categoria por id' })
  @ApiResponse({
    status: 200,
    description: 'Consultar categoria por id',
    type: CategoryDto,
  })
  findOne(@Param('id') id: number) {
    console.log('--------------------->>>>>', id);
    return this.adapter.getSigle(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar categoria por id' })
  @ApiResponse({
    status: 200,
    description: 'Atualizar category por id',
    type: CategoryDto,
  })
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    const category = new Category();
    Object.assign(category, updateCategoryDto);
    return this.adapter.update(id, category);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar categoria' })
  @ApiResponse({
    status: 204,
    description: 'Excluir categoria por id',
  })
  async remove(@Param('id') id: number, @Res() response: Response) {
    await this.adapter.delete(id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
