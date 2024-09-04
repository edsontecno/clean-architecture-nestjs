import { ApiProperty } from '@nestjs/swagger';

export class ProductOrderDTO {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  nome?: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  preco: number;

  @ApiProperty()
  image: string;
}
