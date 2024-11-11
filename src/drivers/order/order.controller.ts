import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { OrderAdapterController } from 'src/adapters/order/controller/OrderAdapterController';
import { ResponseOrderDTO } from 'src/adapters/order/dto/response-order.dto';
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
  @ApiCreatedResponse({
    description: 'Cadastrar pedidos',
  })
  @ApiBody({
    type: CreateOrderDto,
    examples: {
      example1: {
        summary: 'Ordem 1',
        value: {
          items: [
            {
              productId: 1,
              amount: 1,
            },
          ],
        },
      },
      example2: {
        summary: 'Ordem 2',
        value: {
          items: [
            {
              productId: 2,
              amount: 5,
            },
          ],
        },
      },
    },
  })
  async save(@Body() orderDto: CreateOrderDto, @Headers('user') user: any) {
    orderDto.customer = user;
    return await this.adapter.save(orderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar pedidos em andamento' })
  @ApiOkResponse({
    description: 'Lista de pedidos em andamento',
    type: [ResponseOrderDTO],
  })
  getOrders() {
    return this.adapter.getOrders();
  }

  @Get('status')
  @ApiOperation({ summary: 'Listar todos os status disponíveis' })
  @ApiOkResponse({
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
  @ApiParam({
    name: 'status',
    type: String,
    description: 'Consultar Produto',
    examples: {
      Status1: {
        summary: 'Em preparação',
        value: 'em preparação',
      },
      Status2: {
        summary: 'Pronto',
        value: 'pronto',
      },
    },
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
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Consultar pedido',
    examples: {
      Status1: {
        summary: 'Pedido 1',
        value: 1,
      },
      Status2: {
        summary: 'Pedido 2',
        value: 2,
      },
    },
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
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Consultar pedido',
    examples: {
      Status1: {
        summary: 'Pedido 1',
        value: 1,
      },
      Status2: {
        summary: 'Pedido 2',
        value: 2,
      },
    },
  })
  findStatusOrder(@Param('id') id: number) {
    return this.adapter.findStatusOrder(id);
  }

  @Get('/customer/:cpf')
  @ApiOperation({ summary: 'Listar pedidos de um cliente' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos por cliente',
    type: [ResponseOrderDTO],
  })
  @ApiParam({
    name: 'cpf',
    type: String,
    description: 'Consultar pedido por cliente',
    examples: {
      Status1: {
        summary: 'Fulano',
        value: '78750582364',
      },
      Status2: {
        summary: 'Ciclano',
        value: '90995528900',
      },
    },
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
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Consultar pedido',
    examples: {
      Status1: {
        summary: 'Pedido 1',
        value: 1,
      },
      Status2: {
        summary: 'Pedido 2',
        value: 2,
      },
    },
  })
  @ApiParam({
    name: 'status',
    type: String,
    description: 'Consultar Produto',
    examples: {
      Status1: {
        summary: 'Recebido',
        value: 'recebido',
      },
      Status2: {
        summary: 'Em preparação',
        value: 'em preparação',
      },
      Status3: {
        summary: 'Pronto',
        value: 'pronto',
      },
      Status4: {
        summary: 'Finalizado',
        value: 'finalizado',
      },
    },
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
