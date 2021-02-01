import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateProcessDispatchPublicationDateField1611942941043
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'process_dispatchs',
      new TableColumn({
        name: 'publication',
        type: 'date',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('process_dispatchs', 'publication');
  }
}
