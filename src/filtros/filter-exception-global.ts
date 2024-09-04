import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BusinessRuleException } from './business-rule-exception';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseBody {
  @ApiProperty()
  message?: string | object;
  @ApiProperty()
  timestamp?: string;
  @ApiProperty()
  path?: string;
}

@Catch()
export class FilterExceptionGlobal implements ExceptionFilter {
  constructor(private adapterHost: HttpAdapterHost) {}

  catch(excecao: unknown, host: ArgumentsHost) {
    console.log(excecao);
    const { httpAdapter } = this.adapterHost;

    const contexto = host.switchToHttp();
    const resposta = contexto.getResponse();
    const requisicao = contexto.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let body: ErrorResponseBody = {
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(requisicao),
    };

    if (excecao instanceof BusinessRuleException) {
      const regraNegocio = excecao as BusinessRuleException;

      status = regraNegocio.httpStatus || HttpStatus.INTERNAL_SERVER_ERROR;
      body = {
        message: regraNegocio.message,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(requisicao),
      };
    }

    if (excecao instanceof HttpException) {
      status = excecao.getStatus();
      body = {
        message: excecao.getResponse(),
      };
    }

    httpAdapter.reply(resposta, body, status);
  }
}
