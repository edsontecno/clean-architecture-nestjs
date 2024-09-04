import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
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
import { OrderAdapterController } from 'src/adapters/order/controller/OrderAdapterController';
import { Order } from 'src/application/order/entities/Order';
import { MessageDTO } from 'src/system/dto/message.dto';
import { ErrorResponseBody } from 'src/system/filtros/filter-exception-global';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';

@ApiTags('Pedidos')
@ApiBadRequestResponse({
  description: 'Detalhe do erro',
  type: ErrorResponseBody,
})
@ApiInternalServerErrorResponse({ description: 'Erro do servidor' })
@Controller('orders')
export class OrderController {
  constructor(private readonly adapter: OrderAdapterController) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar pedidos' })
  @ApiResponse({
    status: 201,
    description: 'Cadastrar pedidos',
  })
  async save(@Body() orderDto: CreateOrderDto) {
    const order = new Order();
    Object.assign(order, orderDto);
    await this.adapter.save(order);
  }

  @Get('/status/:status')
  @ApiOperation({ summary: 'Listar pedidos por status' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos por status',
    type: [OrderDto],
  })
  getAll(@Param('status') status: string) {
    return this.adapter.getAllByStatus(status);
  }

  @Get('/customer/:cpf')
  @ApiOperation({ summary: 'Listar pedidos de um customer' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos por customer',
    type: [OrderDto],
  })
  getOrderByCustomer(@Param('cpf') cpf: string) {
    return this.adapter.getOrderByCustomer(cpf);
  }

  @Put(':id/change_status/:status')
  @ApiOperation({ summary: 'Alterar o status de um determinado pedidos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos por status',
    type: MessageDTO,
  })
  async changeStatus(
    @Param('id') id: string,
    @Param('status') status: string,
    @Res() response: Response,
  ) {
    const result = await this.adapter.changeStatus(id, status);
    return response.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Get('status')
  @ApiOperation({ summary: 'Listar todos os status disponíveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de status disponíveis para o pedidos',
    type: [String],
  })
  async getListStatus() {
    return await this.adapter.getListStatus();
  }
}
