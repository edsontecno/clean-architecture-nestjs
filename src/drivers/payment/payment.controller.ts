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

@Controller('payment')
@ApiTags('Pagamento')
@ApiBadRequestResponse({
  description: 'Detalhe do erro',
  type: ErrorResponseBody,
})
@ApiInternalServerErrorResponse({ description: 'Erro do servidor' })
export class PaymentController {
  constructor(private readonly adapter: PaymentAdapterController) {}
  @Post()
  @ApiOperation({ summary: 'Criar pagamento' })
  @ApiResponse({
    status: 201,
    description: 'pagamento criado',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor' })
  async createPayment(@Body() amount: PaymentDTO) {
    return await this.adapter.createPayment(amount);
  }
  @Get(':payment_id')
  @ApiOperation({ summary: 'Vizualizar status do pagamento' })
  @ApiResponse({
    status: 200,
    description: 'Registros do pagamento',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor' })
  @ApiParam({
    name: 'payment_id',
    type: Number,
    description: 'Consultar pagamento'
  })
  async getPayment(@Param('payment_id') payment_id: number) {
    return await this.adapter.getPayment(payment_id);
  }
}
