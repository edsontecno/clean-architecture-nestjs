import { ApiProperty } from '@nestjs/swagger';

export class CustomerOrderDTO {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  cpf: string;
}
