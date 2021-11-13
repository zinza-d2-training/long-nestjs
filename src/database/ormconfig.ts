import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { configs } from 'src/configs';

const { host, port, username, password, database } = configs.database;

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
