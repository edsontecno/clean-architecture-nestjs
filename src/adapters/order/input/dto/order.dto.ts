import { ApiProperty } from '@nestjs/swagger';
import { OrderItemDto } from './order-item.dto';
import { CustomerOrderDTO } from './custumer-order.dto';

export class OrderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty({ type: [OrderItemDto] })
  itemsOrder: OrderItemDto[];

  @ApiProperty()
  customer: CustomerOrderDTO;
}
