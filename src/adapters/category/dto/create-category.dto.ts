import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nome da categoria',
    examples: {
      exemplo: {
        summary: 'Senha do usuário 1',
        description: 'Exemplo de Senha de usuário',
        value: 'Teste12#54',
      },
    },
  })
  name: string;

  @ApiProperty({
    description: 'Descrição da categoria',
    examples: {
      exemplo: {
        summary: 'Exemplo de descrição da categoria',
        description: 'Descrição da categoria',
        value: 'Refrigerante',
      },
    },
  })
  description: string;
}
