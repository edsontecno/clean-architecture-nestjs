import { ApiProperty } from '@nestjs/swagger';
import { ProductOrderDTO } from './produt-order.dto';

export class OrderItemSearchDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  quantidade: number;

  @ApiProperty()
  precoVenda: number;

  @ApiProperty()
  product: ProductOrderDTO;
}
