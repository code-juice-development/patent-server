import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateProcessDispatchAnnotationField1612417358858
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'process_dispatchs',
      new TableColumn({
        name: 'annotation',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('process_dispatchs', 'annotation');
  }
}
