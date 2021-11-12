import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { configs } from 'src/configs';
import { User, Vaccine, VaccineUser } from 'src/entities';

const { host, port, username, password, database } = configs.database;

export const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host,
  port,
  username,
  password,
  database,
  entities: [User, Vaccine, VaccineUser],
  synchronize: true
};
