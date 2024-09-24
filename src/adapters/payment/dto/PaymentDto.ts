import { ApiProperty } from '@nestjs/swagger';

export class PaymentDTO {
  @ApiProperty()
  price: number;
}