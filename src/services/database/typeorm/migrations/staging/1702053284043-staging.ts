import { MigrationInterface, QueryRunner } from "typeorm";

export class Staging1702053284043 implements MigrationInterface {
    name = 'Staging1702053284043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "activities" ("id" SERIAL NOT NULL, "type" character varying, "trench" character varying NOT NULL, "amount" numeric(15,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" character varying NOT NULL DEFAULT 'v1', CONSTRAINT "PK_7f4004429f731ffb9c88eb486a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "borrowers" ("id" SERIAL NOT NULL, "fullName" character varying, "email" character varying, "role" character varying, "linkedin" character varying, "companyName" character varying, "tin" integer, "website" character varying, "companyLinkedin" character varying, "companyEntity" character varying, "companyOverview" character varying, "companyYearFounded" character varying, "companySize" character varying, "companyFundingStage" character varying, "companyRegion" character varying, "companyRunway" character varying, "haveAnyDebtFacilities" character varying, "companyOriginatingLoan" character varying, "companyDpd" character varying, "companyUnderlyingAssets" character varying, "companyTotalVolumneOriginatedToDate" character varying, "companyTotalVolumeOriginatedInTheLastTwelveMonths" character varying, "companyAverageLoanSizeInTheLastTwelveMonths" character varying, "companyAverageAnnualEffectiveInterestRateInTheLastTwelveMonths" character varying, "companyAverageLoanTermInTheLastTwelveMonths" character varying, "companyPreferredLoanTerm" character varying, "companyAverageNPLNinetyDaysInTheLastTwelveMonths" character varying, "companyDeckOrWhitepaper" character varying, "companyLinkToBrandAssets" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" character varying NOT NULL DEFAULT 'v1', CONSTRAINT "PK_81e4cddf7ab4dbd5e79a8f84031" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "borrowers"`);
        await queryRunner.query(`DROP TABLE "activities"`);
    }

}
