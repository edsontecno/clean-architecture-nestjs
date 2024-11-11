export enum PaymentStatus {
  Pending = 'pendente',
  Approved = 'recebido',
  Rejected = 'reprovado',
}

export const getEnumFromString = (value: string): PaymentStatus | undefined => {
  if (Object.values(PaymentStatus).includes(value as PaymentStatus)) {
    return value as PaymentStatus;
  }
  return undefined;
};
