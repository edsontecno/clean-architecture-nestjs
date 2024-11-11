import { MigrationInterface, QueryRunner } from "typeorm";

export class AmountPagamento1731360795443 implements MigrationInterface {
    name = 'AmountPagamento1731360795443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_e6642ca1481ddafed600e2c9a88"`);
        await queryRunner.query(`ALTER TABLE "pagamentos" DROP COLUMN "valor"`);
        await queryRunner.query(`ALTER TABLE "pagamentos" ADD "valor" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_e6642ca1481ddafed600e2c9a88" FOREIGN KEY ("payment_id") REFERENCES "pagamentos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_e6642ca1481ddafed600e2c9a88"`);
        await queryRunner.query(`ALTER TABLE "pagamentos" DROP COLUMN "valor"`);
        await queryRunner.query(`ALTER TABLE "pagamentos" ADD "valor" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_e6642ca1481ddafed600e2c9a88" FOREIGN KEY ("payment_id") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
