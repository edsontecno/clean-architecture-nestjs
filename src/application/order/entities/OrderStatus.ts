export enum OrderStatus {
  Pending = 'pendente',
  Received = 'recebido',
  InProgress = 'em preparação',
  Ready = 'aproveed',
  Fineshed = 'finalizado',
  Canceled = 'rejected',
}

export const getEnumFromString = (value: string): OrderStatus | undefined => {
  if (Object.values(OrderStatus).includes(value as OrderStatus)) {
    return value as OrderStatus;
  }
  return undefined;
};
