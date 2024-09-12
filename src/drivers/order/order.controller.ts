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
import { ResponseOrderDTO } from 'src/adapters/order/dto/response-order.dto';
import { Order } from 'src/application/order/entities/Order';
import { ErrorResponseBody } from 'src/system/filtros/filter-exception-global';
import { CreateOrderDto } from '../../adapters/order/dto/create-order.dto';

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
    return await this.adapter.save(order);
  }

  @Get()
  @ApiOperation({ summary: 'Listar pedidos em andamento' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos em andamento',
    type: [ResponseOrderDTO],
  })
  getOrders() {
    return this.adapter.getOrders();
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

  @Get('/status/:status')
  @ApiOperation({ summary: 'Listar pedidos por status' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos por status',
    type: [ResponseOrderDTO],
  })
  getAll(@Param('status') status: string) {
    return this.adapter.getAllByStatus(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar pedido por id' })
  @ApiResponse({
    status: 200,
    description: 'Consultar pedido por id',
    type: ResponseOrderDTO,
  })
  findOne(@Param('id') id: number) {
    return this.adapter.getById(id);
  }

  @Get(':id/status')
  @ApiOperation({ summary: 'Consultar pedido por status' })
  @ApiResponse({
    status: 200,
    description: 'Consultar pedido por status',
    type: String,
  })
  findStatusOrder(@Param('id') id: number) {
    return this.adapter.findStatusOrder(id);
  }

  @Get('/customer/:cpf')
  @ApiOperation({ summary: 'Listar pedidos de um customer' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos por customer',
    type: [ResponseOrderDTO],
  })
  getOrderByCustomer(@Param('cpf') cpf: string) {
    return this.adapter.getOrderByCustomer(cpf);
  }

  @Put(':id/change_status/:status')
  @ApiOperation({ summary: 'Alterar o status de um determinado pedidos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos por status',
    type: ResponseOrderDTO,
  })
  async changeStatus(
    @Param('id') id: string,
    @Param('status') status: string,
    @Res() response: Response,
  ) {
    const result = await this.adapter.changeStatus(id, status);
    return response.status(HttpStatus.OK).json(result);
  }
}
