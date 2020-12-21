import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProcessStage1607699081279 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'process_stages',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'code',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'deadline',
            type: 'varchar',
          },
          {
            name: 'send_message',
            type: 'boolean',
            default: false,
          },
          {
            name: 'model_message',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'send_email',
            type: 'boolean',
            default: false,
          },
          {
            name: 'model_email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('process_stages');
  }
}
