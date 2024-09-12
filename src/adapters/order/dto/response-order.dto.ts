import { ApiProperty } from '@nestjs/swagger';

export class ResponseItem {
  @ApiProperty()
  amount: number;
  @ApiProperty()
  price: number;
  @ApiProperty()
  product: string;
}

export class ResponseOrderDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  total: number;
  @ApiProperty()
  status: string;
  @ApiProperty()
  customer: string;
  @ApiProperty()
  awaitTime: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty({ type: [ResponseItem] })
  items: ResponseItem[];
}
