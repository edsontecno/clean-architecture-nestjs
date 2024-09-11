export type ResponseItem = {
  amount: number;
  price: number;
  product: string;
};

export class ResponseOrderDTO {
  id: number;
  total: number;
  status: string;
  customer: string;
  awaitTime: string;
  createdAt: string;
  items: ResponseItem[];
}
