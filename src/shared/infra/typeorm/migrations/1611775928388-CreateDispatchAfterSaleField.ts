import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateDispatchAfterSaleField1611775928388
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'dispatchs',
      new TableColumn({
        name: 'after_sale',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('dispatchs', 'after_sale');
  }
}
