export class BusinessRuleException extends Error {
  public httpStatus;
  constructor(message?: string, httpStatus = 400) {
    super(message || 'Erro ao processar a operação');
    this.httpStatus = httpStatus;
  }
}
