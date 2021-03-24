import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddParentIdFieldToTransaction1616606112818
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'parent_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'parent_id');
  }
}
