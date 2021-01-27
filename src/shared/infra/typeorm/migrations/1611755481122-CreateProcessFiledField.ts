import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateProcessFiledField1611755481122
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'processes',
      new TableColumn({
        name: 'filed',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('processes', 'filed');
  }
}
