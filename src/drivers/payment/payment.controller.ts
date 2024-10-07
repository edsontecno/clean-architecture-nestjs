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
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseBody } from 'src/system/filtros/filter-exception-global';
import { Response } from 'express';
import { Payment } from 'src/application/payment/entities/Payment';
import { PaymentAdapterController } from 'src/adapters/payment/controller/PaymentAdaptercontroller';
import { PaymentDTO } from 'src/adapters/payment/dto/PaymentDto';
import axios from 'axios';

@Controller()
@ApiTags('Pagamento')
@ApiBadRequestResponse({
  description: 'Detalhe do erro',
  type: ErrorResponseBody,
})
@ApiInternalServerErrorResponse({ description: 'Erro do servidor' })
export class PaymentController {
  constructor(private readonly adapter: PaymentAdapterController) { }
  @Post('webhook')
  @ApiOperation({ summary: 'Receber eventos do webhook' })
  @ApiResponse({
    status: 200,
    description: 'Evento do webhook recebido com sucesso',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor' })
  async handleWebhook(@Body() payload: any, @Res() response: Response) {
    if (!payload.data.id) {
      return 'Webhook ativo';
    }

    const payment = await this.adapter.handleWebhook(payload.data.id);
;
    if (payment.status === 'pending') {
      console.log('Pagamento aguardando');
    } 
    if (payment.status === 'approved') {
      console.log('Pagamento aprovado');
    } 
    if (payment.status === 'rejected') {
      console.log('Pagamento recusado');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Endpoint Inicial' })
  @ApiResponse({ status: 200, description: 'Servidor ativo' })
  getHealthCheck(@Res() response: Response) {
    return response.status(HttpStatus.OK).send('Servidor ativo');
  }
}