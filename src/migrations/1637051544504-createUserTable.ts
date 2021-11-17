import { EnumRoles } from 'src/interfaces/roles';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserTable1637051544504 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'citizen_id',
            type: 'varchar',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'full_name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'gender',
            type: 'int',
            isNullable: false
          },
          {
            name: 'phone_number',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'dob',
            type: 'timestamp',
            isNullable: false
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'ward_id',
            type: 'int',
            isNullable: false
          },
          {
            name: 'role',
            type: 'int',
            isNullable: false,
            default: EnumRoles.NORMAL_USER
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
