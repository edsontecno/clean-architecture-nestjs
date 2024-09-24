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
  async createPayment(@Body() price: PaymentDTO) {
    return await this.adapter.createPayment(price);
  }
}
