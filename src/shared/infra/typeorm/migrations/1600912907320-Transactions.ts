import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Transactions1600912907320 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'account_id',
            type: 'uuid',
          },
          {
            name: 'subcategory_id',
            type: 'uuid',
          },
          {
            name: 'costcenter_id',
            type: 'uuid',
          },
          {
            name: 'installment',
            type: 'integer',
          },
          {
            name: 'installments',
            type: 'integer',
          },
          {
            name: 'transaction_date',
            type: 'date',
          },
          {
            name: 'due_date',
            type: 'date',
          },
          {
            name: 'total',
            type: 'decimal',
            precision: 6,
            scale: 2,
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
        foreignKeys: [
          {
            name: 'AccountId',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['account_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'SubcategoryId',
            referencedTableName: 'subcategories',
            referencedColumnNames: ['id'],
            columnNames: ['subcategory_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'CostCenterId',
            referencedTableName: 'cost_center',
            referencedColumnNames: ['id'],
            columnNames: ['costcenter_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
