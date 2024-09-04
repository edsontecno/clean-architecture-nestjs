import { ApiProperty } from '@nestjs/swagger';

export class CustomerDTO {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  cpf: string;
}
