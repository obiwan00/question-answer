import {MigrationInterface, QueryRunner} from "typeorm";

export class init1665591125860 implements MigrationInterface {
    name = 'init1665591125860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9" UNIQUE ("password"), CONSTRAINT "UQ_aa1eae04b5c1202f356dca4b554" UNIQUE ("salt"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topics" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, "likesCount" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "authorId" integer, CONSTRAINT "PK_e4aa99a3fa60ec3a37d1fc4e853" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_d90243459a697eadb8ad56e9092" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "users_likes_topics" ("usersId" integer NOT NULL, "topicsId" integer NOT NULL, CONSTRAINT "PK_09c1ac6521b459228eb12b995a1" PRIMARY KEY ("usersId", "topicsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_df33be58a991e63e5f68d8ff9e" ON "users_likes_topics" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_eceb0cc5f238469715b17be7ad" ON "users_likes_topics" ("topicsId") `);
        await queryRunner.query(`CREATE TABLE "users_dislikes_topics" ("usersId" integer NOT NULL, "topicsId" integer NOT NULL, CONSTRAINT "PK_5557d55de50b456548397b7156c" PRIMARY KEY ("usersId", "topicsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_39db13f90db8538cc477443ff0" ON "users_dislikes_topics" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e319dfca4edf6ad0c924aff4e2" ON "users_dislikes_topics" ("topicsId") `);
        await queryRunner.query(`CREATE TABLE "topics_tags_tags" ("topicsId" integer NOT NULL, "tagsName" character varying NOT NULL, CONSTRAINT "PK_67a92c1337799388247b5dc327c" PRIMARY KEY ("topicsId", "tagsName"))`);
        await queryRunner.query(`CREATE INDEX "IDX_25dcd612cc7a8b8d26f83088ef" ON "topics_tags_tags" ("topicsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7674bf52840fbf4e16963ea8f6" ON "topics_tags_tags" ("tagsName") `);
        await queryRunner.query(`ALTER TABLE "topics" ADD CONSTRAINT "FK_f5d6f32844b64e10d0eca435868" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_likes_topics" ADD CONSTRAINT "FK_df33be58a991e63e5f68d8ff9e1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_likes_topics" ADD CONSTRAINT "FK_eceb0cc5f238469715b17be7ad9" FOREIGN KEY ("topicsId") REFERENCES "topics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_dislikes_topics" ADD CONSTRAINT "FK_39db13f90db8538cc477443ff09" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_dislikes_topics" ADD CONSTRAINT "FK_e319dfca4edf6ad0c924aff4e27" FOREIGN KEY ("topicsId") REFERENCES "topics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topics_tags_tags" ADD CONSTRAINT "FK_25dcd612cc7a8b8d26f83088ef6" FOREIGN KEY ("topicsId") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "topics_tags_tags" ADD CONSTRAINT "FK_7674bf52840fbf4e16963ea8f61" FOREIGN KEY ("tagsName") REFERENCES "tags"("name") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topics_tags_tags" DROP CONSTRAINT "FK_7674bf52840fbf4e16963ea8f61"`);
        await queryRunner.query(`ALTER TABLE "topics_tags_tags" DROP CONSTRAINT "FK_25dcd612cc7a8b8d26f83088ef6"`);
        await queryRunner.query(`ALTER TABLE "users_dislikes_topics" DROP CONSTRAINT "FK_e319dfca4edf6ad0c924aff4e27"`);
        await queryRunner.query(`ALTER TABLE "users_dislikes_topics" DROP CONSTRAINT "FK_39db13f90db8538cc477443ff09"`);
        await queryRunner.query(`ALTER TABLE "users_likes_topics" DROP CONSTRAINT "FK_eceb0cc5f238469715b17be7ad9"`);
        await queryRunner.query(`ALTER TABLE "users_likes_topics" DROP CONSTRAINT "FK_df33be58a991e63e5f68d8ff9e1"`);
        await queryRunner.query(`ALTER TABLE "topics" DROP CONSTRAINT "FK_f5d6f32844b64e10d0eca435868"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7674bf52840fbf4e16963ea8f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_25dcd612cc7a8b8d26f83088ef"`);
        await queryRunner.query(`DROP TABLE "topics_tags_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e319dfca4edf6ad0c924aff4e2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_39db13f90db8538cc477443ff0"`);
        await queryRunner.query(`DROP TABLE "users_dislikes_topics"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eceb0cc5f238469715b17be7ad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df33be58a991e63e5f68d8ff9e"`);
        await queryRunner.query(`DROP TABLE "users_likes_topics"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "topics"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
