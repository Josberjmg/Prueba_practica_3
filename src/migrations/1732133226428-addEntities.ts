import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEntities1732133226428 implements MigrationInterface {
    name = 'AddEntities1732133226428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment method" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "payment_method" character varying NOT NULL, CONSTRAINT "PK_e365a889935f190fe7c1e089df1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."purchase_status_enum" AS ENUM('created', 'modified', 'pending approval', 'approved', 'in process', 'processed', 'rejected', 'canceled')`);
        await queryRunner.query(`CREATE TABLE "purchase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "payment_method_id" character varying NOT NULL, "status" "public"."purchase_status_enum" NOT NULL, "payment_Method_Id" uuid, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "warehouse" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_8640ce443066a0e1e7991d7971b" FOREIGN KEY ("payment_Method_Id") REFERENCES "payment method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_8640ce443066a0e1e7991d7971b"`);
        await queryRunner.query(`ALTER TABLE "warehouse" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`DROP TYPE "public"."purchase_status_enum"`);
        await queryRunner.query(`DROP TABLE "payment method"`);
    }

}
