import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pagamento1731360325697 implements MigrationInterface {
  name = 'Pagamento1731360325697';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pagamentos" DROP COLUMN "descrição"`);
    await queryRunner.query(
      `ALTER TABLE "pagamentos" ADD "descricao" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pagamentos" ADD "qrcode" character varying`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."pagamentos_status_enum" AS ENUM('pendente', 'recebido', 'reprovado')`,
    );
    await queryRunner.query(
      `ALTER TABLE "pagamentos" ADD "status" "public"."pagamentos_status_enum" NOT NULL DEFAULT 'pendente'`,
    );
    await queryRunner.query(`ALTER TABLE "pagamentos" ADD "mp_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "pedidos" ALTER COLUMN "payment_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" ADD CONSTRAINT "FK_e6642ca1481ddafed600e2c9a88" FOREIGN KEY ("payment_id") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pedidos" DROP CONSTRAINT "FK_e6642ca1481ddafed600e2c9a88"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" ALTER COLUMN "payment_id" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "pagamentos" DROP COLUMN "mp_id"`);
    await queryRunner.query(`ALTER TABLE "pagamentos" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."pagamentos_status_enum"`);
    await queryRunner.query(`ALTER TABLE "pagamentos" DROP COLUMN "qrcode"`);
    await queryRunner.query(`ALTER TABLE "pagamentos" DROP COLUMN "descricao"`);
    await queryRunner.query(
      `ALTER TABLE "pagamentos" ADD "descrição" character varying NOT NULL`,
    );
  }
}
