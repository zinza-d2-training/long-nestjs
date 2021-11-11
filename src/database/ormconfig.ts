import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User, Vaccine, VaccineUser } from 'src/entities';

export const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Lo2389ng@itm',
  database: 'demo',
  entities: [User, Vaccine, VaccineUser],
  synchronize: true,
};
