import { MigrationInterface, QueryRunner } from "typeorm";

export class Cliente1719403924325 implements MigrationInterface {
    name = 'Cliente1719403924325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "email" character varying(200) NOT NULL, "cpf" character varying(11) NOT NULL, CONSTRAINT "UQ_fd1214820b9f05720b26a917630" UNIQUE ("cpf"), CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clientes"`);
    }

}
