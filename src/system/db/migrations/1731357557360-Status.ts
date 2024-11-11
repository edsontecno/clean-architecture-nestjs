import { MigrationInterface, QueryRunner } from 'typeorm';

export class Status1731357557360 implements MigrationInterface {
  name = 'Status1731357557360';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."pedidos_status_enum" RENAME TO "pedidos_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."pedidos_status_enum" AS ENUM('pendente', 'recebido', 'em preparação', 'pronto', 'finalizado', 'cancelado')`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" ALTER COLUMN "status" TYPE "public"."pedidos_status_enum" USING "status"::"text"::"public"."pedidos_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" ALTER COLUMN "status" SET DEFAULT 'pendente'`,
    );
    await queryRunner.query(`DROP TYPE "public"."pedidos_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."pedidos_status_enum_old" AS ENUM('pendente', 'recebido', 'em preparação', 'aproveed', 'finalizado', 'rejected')`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" ALTER COLUMN "status" TYPE "public"."pedidos_status_enum_old" USING "status"::"text"::"public"."pedidos_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedidos" ALTER COLUMN "status" SET DEFAULT 'pendente'`,
    );
    await queryRunner.query(`DROP TYPE "public"."pedidos_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."pedidos_status_enum_old" RENAME TO "pedidos_status_enum"`,
    );
  }
}
