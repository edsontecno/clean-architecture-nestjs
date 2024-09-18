import { ApiProperty } from '@nestjs/swagger';

export class PaymentDTO {
  @ApiProperty({ description: 'Preço total do item', required: true })
  price: number;

  @ApiProperty({ description: 'Descrição do item', required: false })
  description?: string;
}