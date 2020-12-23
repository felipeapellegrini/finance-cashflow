import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPaymentDateFieldToTransaction1608693866035
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'payment_date',
        type: 'date',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'payment_date');
  }
}
