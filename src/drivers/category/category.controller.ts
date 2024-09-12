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
import { CategoryAdapterController } from 'src/adapters/category/controller/CategoryAdapterController';
import { ErrorResponseBody } from 'src/system/filtros/filter-exception-global';
import { CategoryDto } from '../../adapters/category/dto/category.dto';
import { CreateCategoryDto } from '../../adapters/category/dto/create-category.dto';

@ApiTags('Categoria')
@ApiBadRequestResponse({
  description: 'Detalhe do erro',
  type: ErrorResponseBody,
})
@ApiInternalServerErrorResponse({ description: 'Erro do servidor' })
@Controller('category')
export class CategoryController {
  constructor(private readonly adapter: CategoryAdapterController) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar categoria' })
  @ApiResponse({
    status: 201,
    description: 'Cadastro de categoria',
    type: CategoryDto,
  })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.adapter.save(createCategoryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar categoria por id' })
  @ApiResponse({
    status: 200,
    description: 'Consultar categoria por id',
    type: CategoryDto,
  })
  findOne(@Param('id') id: number) {
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
    return this.adapter.update(id, updateCategoryDto);
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
