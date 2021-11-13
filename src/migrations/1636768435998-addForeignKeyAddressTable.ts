import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class addForeignKeyAddressTable1636768435998
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'districts',
      new TableForeignKey({
        columnNames: ['province_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'provinces',
        onDelete: 'CASCADE'
      })
    );

    await queryRunner.createForeignKey(
      'wards',
      new TableForeignKey({
        columnNames: ['district_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'districts',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const districtTable = await queryRunner.getTable('districts');
    const districtForeignKey = districtTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('province_id') !== -1
    );
    await queryRunner.dropForeignKey('districts', districtForeignKey);

    const wardTable = await queryRunner.getTable('wards');
    const wardForeignKey = wardTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('district_id') !== -1
    );
    await queryRunner.dropForeignKey('wards', wardForeignKey);
  }
}
