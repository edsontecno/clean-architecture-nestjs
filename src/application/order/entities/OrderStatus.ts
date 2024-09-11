export enum OrderStatus {
  Pending = 'pendente',
  Received = 'recebido',
  InProgress = 'em preparação',
  Ready = 'pronto',
  Fineshed = 'finalizado',
  Canceled = 'cancelado',
}

export const getEnumFromString = (value: string): OrderStatus | undefined => {
  if (Object.values(OrderStatus).includes(value as OrderStatus)) {
    return value as OrderStatus;
  }
  return undefined;
};
