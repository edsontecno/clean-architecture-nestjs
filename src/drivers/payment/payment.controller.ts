import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { PaymentAdapterController } from 'src/adapters/payment/controller/PaymentAdaptercontroller';
import { ErrorResponseBody } from 'src/system/filtros/filter-exception-global';

@Controller()
@ApiTags('Pagamento')
@ApiBadRequestResponse({
  description: 'Detalhe do erro',
  type: ErrorResponseBody,
})
@ApiInternalServerErrorResponse({ description: 'Erro do servidor' })
export class PaymentController {
  constructor(private readonly adapter: PaymentAdapterController) {}
  @Post('webhook')
  @ApiOperation({ summary: 'Receber eventos do webhook' })
  @ApiResponse({
    status: 200,
    description: 'Evento do webhook recebido com sucesso',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        data: { type: 'object', properties: { id: { type: 'string' } } },
      },
    },
    examples: {
      example1: {
        summary: 'Pagamento 1',
        value: {
          data: {
            id: '12345678',
          },
        },
      },
      example2: {
        summary: 'Pagamento 2',
        value: {
          data: {
            id: '987654321',
          },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor' })
  async handleWebhook(@Body() payload: any) {
    return await this.adapter.handleWebhook(payload.data.id);
  }

  @Get()
  @ApiOperation({ summary: 'Endpoint Inicial' })
  @ApiResponse({ status: 200, description: 'Servidor ativo' })
  getHealthCheck(@Res() response: Response) {
    return response.status(HttpStatus.OK).send('Servidor ativo');
  }
}
