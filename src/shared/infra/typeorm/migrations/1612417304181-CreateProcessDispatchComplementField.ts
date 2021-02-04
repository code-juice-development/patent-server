import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateProcessDispatchComplementField1612417304181
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'process_dispatchs',
      new TableColumn({
        name: 'complement',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('process_dispatchs', 'complement');
  }
}
