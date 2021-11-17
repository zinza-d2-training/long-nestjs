import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class createFkFileTable1637053651280 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'images',
      new TableForeignKey({
        columnNames: ['file_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'files',
        onDelete: 'CASCADE'
      })
    );
    await queryRunner.createForeignKey(
      'images',
      new TableForeignKey({
        columnNames: ['citizen_image_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'citizen_id_images',
        onDelete: 'CASCADE'
      })
    );
    await queryRunner.createForeignKey(
      'citizen_id_images',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const imageTable = await queryRunner.getTable('images');
    let imageForeignKey = imageTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('file_id') !== -1
    );
    await queryRunner.dropForeignKey('images', imageForeignKey);
    imageForeignKey = imageTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('citizen_image_id') !== -1
    );
    await queryRunner.dropForeignKey('images', imageForeignKey);

    const citizenImageTable = await queryRunner.getTable('citizen_id_images');
    const citizenImageForeignKey = citizenImageTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1
    );
    await queryRunner.dropForeignKey(
      'citizen_id_images',
      citizenImageForeignKey
    );
  }
}
