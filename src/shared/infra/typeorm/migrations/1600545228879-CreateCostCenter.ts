import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateCostCenter1600545228879 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cost_center',
                columns: [
                  {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                  },
                  {
                    name: 'name',
                    type: 'varchar',
                  },
                  {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                  },
                  {
                    name: 'owner',
                    type: 'uuid',
                  },
                  {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                  },
                ],
                foreignKeys: [
                  {
                    name: 'CenterOwner',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['owner'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                  },
                ],
              }),
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cost_center');
    }

}
