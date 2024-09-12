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
import { ErrorResponseBody } from 'src/system/filtros/filter-exception-global';
import { Response } from 'express';
import { Customer } from 'src/application/customer/entities/Customer';
import { CustomerAdapterController } from 'src/adapters/custumer/controller/CustumerAdapterController';
import { CustomerDTO } from 'src/adapters/custumer/dto/CustomerDto';

@Controller('customer')
@ApiTags('Cliente')
@ApiBadRequestResponse({
  description: 'Detalhe do erro',
  type: ErrorResponseBody,
})
@ApiInternalServerErrorResponse({ description: 'Erro do servidor' })
export class CustomerController {
  constructor(private readonly adapter: CustomerAdapterController) {}
  @Post()
  @ApiOperation({ summary: 'Criar cliente' })
  @ApiResponse({
    status: 201,
    description: 'cliente salvo',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor' })
  async saveCustomer(@Body() dadosDoUsuario: CustomerDTO) {
    return await this.adapter.saveCustomer(dadosDoUsuario);
  }

  @Get(':cpf')
  @ApiOperation({ summary: 'Consultar cliente' })
  @ApiResponse({
    status: 200,
    description: 'Consultar cliente por cpf',
    type: Customer,
  })
  async getCustomerByCpf(@Param('cpf') cpf: string) {
    return await this.adapter.getCustomer(cpf);
  }

  @Delete(':cpf')
  @ApiOperation({ summary: 'Excluir cliente' })
  @ApiResponse({
    status: 204,
    description: 'Excluir cliente por cpf',
  })
  async deleteCustomerByCpf(
    @Param('cpf') cpf: string,
    @Res() response: Response,
  ) {
    await this.adapter.deleteCustomer(cpf);
    return response.status(HttpStatus.NO_CONTENT).json();
  }

  @Patch(':cpf')
  @ApiOperation({ summary: 'Atualizar cliente' })
  @ApiResponse({
    status: 200,
    description: 'Consultar cliente por cpf',
    type: Customer,
  })
  async updateCustomerByCpf(
    @Param('cpf') cpf: string,
    @Body() dadosDoUsuario: CustomerDTO,
  ) {
    const customer = new Customer();
    Object.assign(customer, dadosDoUsuario);

    return await this.adapter.updateCustomer(cpf, customer);
  }
}