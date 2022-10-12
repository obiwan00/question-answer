import { MigrationInterface, QueryRunner } from "typeorm";

export class Seeds1665591125860 implements MigrationInterface {
  name = 'seeds1665591125860'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO tags (name) VALUES ('test-1'), ('test-2')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
