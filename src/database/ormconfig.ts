import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbConfigs } from 'src/configs';

const { host, port, username, password, database } = dbConfigs.database;

export const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host,
  port,
  username,
  password,
  database,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false
};
