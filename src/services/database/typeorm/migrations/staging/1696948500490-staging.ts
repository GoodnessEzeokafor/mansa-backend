import { MigrationInterface, QueryRunner } from "typeorm";

export class Staging1696948500490 implements MigrationInterface {
    name = 'Staging1696948500490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "slug" text`);
        await queryRunner.query(`ALTER TABLE "company" ADD "adminId" integer`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_8a81b99e43da19da787fb9644aa" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_8a81b99e43da19da787fb9644aa"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "adminId"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "slug"`);
    }

}
