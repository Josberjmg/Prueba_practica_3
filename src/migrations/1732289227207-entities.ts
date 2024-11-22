import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1732289227207 implements MigrationInterface {
    name = 'Entities1732289227207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "contact" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "postal_code" integer NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD "Customer_Id" uuid`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_dd4e5e9f352d49d8367cca90b8d" FOREIGN KEY ("Customer_Id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_dd4e5e9f352d49d8367cca90b8d"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "Customer_Id"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
