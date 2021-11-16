import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class addAddressTable1636768084858 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'provinces',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true
          },
          {
            name: 'province_name',
            type: 'varchar'
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'districts',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true
          },
          {
            name: 'district_name',
            type: 'varchar'
          },
          {
            name: 'province_id',
            type: 'int'
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'wards',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true
          },
          {
            name: 'ward_name',
            type: 'varchar'
          },
          {
            name: 'district_id',
            type: 'int'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('provinces');
    await queryRunner.dropTable('districts');
    await queryRunner.dropTable('wards');
  }
}
