import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProcessStatusStage1608578163473
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'process_status_stages',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'has_pending',
            type: 'boolean',
          },
          {
            name: 'status_pending',
            type: 'varchar',
          },
          {
            name: 'resolved_pending',
            type: 'boolean',
          },
          {
            name: 'process_id',
            type: 'uuid',
          },
          {
            name: 'dispatch_id',
            type: 'uuid',
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

    await queryRunner.createForeignKey(
      'process_status_stages',
      new TableForeignKey({
        columnNames: ['process_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'processes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'process_status_stages',
      new TableForeignKey({
        columnNames: ['dispatch_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'dispatchs',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('process_status_stages');
  }
}
