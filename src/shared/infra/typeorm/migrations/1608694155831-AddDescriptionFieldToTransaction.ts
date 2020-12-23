import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDescriptionFieldToTransaction1608694155831
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'description');
  }
}
