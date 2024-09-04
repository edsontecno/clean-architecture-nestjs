import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pedido1719868093380 implements MigrationInterface {
  name = 'Pedido1719868093380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "itens_pedidos" ("id" SERIAL NOT NULL, "quantidade" integer NOT NULL, "preco_venda" numeric(10,2) NOT NULL, "pedidoId" integer, "produtoId" integer, CONSTRAINT "PK_d93e780d333fe5d91e43797e8b5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."pedidos_status_enum" AS ENUM('pendente', 'recebido', 'em preparação', 'pronto', 'finalizado', 'cancelado')`,
    );
    await queryRunner.query(
      `CREATE TABLE "pedidos" ("id" SERIAL NOT NULL, "total" numeric(10,2) NOT NULL, "status" "public"."pedidos_status_enum" NOT NULL DEFAULT 'pendente', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "clienteId" integer, CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedidos" ADD CONSTRAINT "FK_aaa757efbf4f9fb222709a140b2" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedidos" ADD CONSTRAINT "FK_d07fbe9a1faab330529824f7fea" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" ADD CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pedidos" DROP CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_d07fbe9a1faab330529824f7fea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_aaa757efbf4f9fb222709a140b2"`,
    );
    await queryRunner.query(`DROP TABLE "pedidos"`);
    await queryRunner.query(`DROP TYPE "public"."pedidos_status_enum"`);
    await queryRunner.query(`DROP TABLE "itens_pedidos"`);
  }
}
