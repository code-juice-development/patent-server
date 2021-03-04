import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateProcessBirthdayFieldNullable1614455220629
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'processes',
      'birthday',
      new TableColumn({
        name: 'birthday',
        type: 'date',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'processes',
      'birthday',
      new TableColumn({
        name: 'birthday',
        type: 'date',
        isNullable: false,
      }),
    );
  }
}
