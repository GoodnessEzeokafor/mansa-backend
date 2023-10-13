import { MigrationInterface, QueryRunner } from "typeorm";

export class Staging1696942851198 implements MigrationInterface {
    name = 'Staging1696942851198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" text, "website" text, "linkedin" text, "overview" text, "addedByAddress" text, "country" text, "ethAddress" text, "verified" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" character varying NOT NULL DEFAULT 'v1', CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deal" ("id" SERIAL NOT NULL, "status" text, "paymentFrquency" text, "termStartDate" text, "loanEndDate" text, "totalValueLocked" numeric(15,2) NOT NULL DEFAULT '0', "totalPrincipalIssued" numeric(15,2) NOT NULL DEFAULT '0', "creditOustanding" numeric(15,2) NOT NULL DEFAULT '0', "numberOfRepaidDeals" numeric(15,2) NOT NULL DEFAULT '0', "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" character varying NOT NULL DEFAULT 'v1', "adminId" integer, "companyId" integer, CONSTRAINT "PK_9ce1c24acace60f6d7dc7a7189e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "email" character varying, "address" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "role" character varying, "active" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" character varying NOT NULL DEFAULT 'v1', CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "investor" ("id" SERIAL NOT NULL, "address" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" character varying NOT NULL DEFAULT 'v1', CONSTRAINT "PK_c60a173349549955c39d3703551" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "deal" ADD CONSTRAINT "FK_a7766f367db2ee6a8a50e777767" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deal" ADD CONSTRAINT "FK_05d40d51957319ffe1a5888267f" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_05d40d51957319ffe1a5888267f"`);
        await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_a7766f367db2ee6a8a50e777767"`);
        await queryRunner.query(`DROP TABLE "investor"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "deal"`);
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
