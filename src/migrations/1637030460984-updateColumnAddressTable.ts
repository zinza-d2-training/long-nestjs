import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateColumnAddressTable1637030460984
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('provinces', 'province_name', 'name');
    await queryRunner.renameColumn('districts', 'district_name', 'name');
    await queryRunner.renameColumn('wards', 'ward_name', 'name');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('provinces', 'name', 'province_name');
    await queryRunner.renameColumn('districts', 'name', 'district_name');
    await queryRunner.renameColumn('wards', 'name', 'ward_name');
  }
}
