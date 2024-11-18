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
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CustomerAdapterController } from 'src/adapters/custumer/controller/CustumerAdapterController';
import { CustomerDTO } from 'src/adapters/custumer/dto/CustomerDto';
import { Customer } from 'src/application/customer/entities/Customer';
import { ErrorResponseBody } from 'src/system/filtros/filter-exception-global';

@Controller('customer')
// @ApiTags('Cliente')
// @ApiBadRequestResponse({
//   description: 'Detalhe do erro',
//   type: ErrorResponseBody,
// })
// @ApiInternalServerErrorResponse({ description: 'Erro do servidor' })
export class CustomerController {
  // constructor(private readonly adapter: CustomerAdapterController) {}
  // @Post()
  // // @ApiOperation({ summary: 'Criar cliente' })
  // // @ApiCreatedResponse({
  // //   description: 'cliente salvo',
  // // })
  // // @ApiBody({
  // //   type: CustomerDTO,
  // //   examples: {
  // //     example1: {
  // //       summary: 'Cliente 1',
  // //       value: {
  // //         name: 'Fulano da Silva',
  // //         email: 'fulano@gmail.com',
  // //         cpf: '78750582364',
  // //       },
  // //     },
  // //     example2: {
  // //       summary: 'Cliente 2',
  // //       value: {
  // //         name: 'Ciclano da Silva',
  // //         email: 'Ciclano@gmail.com',
  // //         cpf: '90995528900',
  // //       },
  // //     },
  // //   },
  // // })
  // // @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor' })
  // async saveCustomer(@Body() dadosDoUsuario: CustomerDTO) {
  //   return await this.adapter.saveCustomer(dadosDoUsuario);
  // }
  // @Get(':cpf')
  // @ApiOperation({ summary: 'Consultar cliente' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Consultar cliente por cpf',
  //   type: Customer,
  // })
  // @ApiParam({
  //   name: 'cpf',
  //   type: Number,
  //   description: 'Consultar cliente',
  //   examples: {
  //     Fulano: {
  //       value: '78750582364',
  //     },
  //     Ciclano: {
  //       value: '90995528900',
  //     },
  //   },
  // })
  // async getCustomerByCpf(@Param('cpf') cpf: string) {
  //   return await this.adapter.getCustomer(cpf);
  // }
  // @Delete(':cpf')
  // @ApiOperation({ summary: 'Excluir cliente' })
  // @ApiResponse({
  //   status: 204,
  //   description: 'Excluir cliente por cpf',
  // })
  // @ApiParam({
  //   name: 'cpf',
  //   type: Number,
  //   description: 'Consultar cliente',
  //   examples: {
  //     Fulano: {
  //       value: '78750582364',
  //     },
  //     Ciclano: {
  //       value: '90995528900',
  //     },
  //   },
  // })
  // async deleteCustomerByCpf(
  //   @Param('cpf') cpf: string,
  //   @Res() response: Response,
  // ) {
  //   await this.adapter.deleteCustomer(cpf);
  //   return response.status(HttpStatus.NO_CONTENT).json();
  // }
  // @Patch(':cpf')
  // @ApiOperation({ summary: 'Atualizar cliente' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Consultar cliente por cpf',
  //   type: Customer,
  // })
  // @ApiParam({
  //   name: 'cpf',
  //   type: Number,
  //   description: 'Consultar cliente',
  //   examples: {
  //     Fulano: {
  //       value: '78750582364',
  //     },
  //     Ciclano: {
  //       value: '90995528900',
  //     },
  //   },
  // })
  // @ApiBody({
  //   type: CustomerDTO,
  //   examples: {
  //     example1: {
  //       summary: 'Cliente 1',
  //       value: {
  //         name: 'Fulano da Silva',
  //         email: 'fulano@gmail.com',
  //       },
  //     },
  //     example2: {
  //       summary: 'Cliente 2',
  //       value: {
  //         name: 'Ciclano da Silva',
  //         email: 'Ciclano@gmail.com',
  //       },
  //     },
  //   },
  // })
  // async updateCustomerByCpf(
  //   @Param('cpf') cpf: string,
  //   @Body() dadosDoUsuario: CustomerDTO,
  // ) {
  //   const customer = new Customer();
  //   Object.assign(customer, dadosDoUsuario);
  //   return await this.adapter.updateCustomer(cpf, customer);
  // }
}
