import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { ormconfig } from 'src/database/ormconfig';
import { AddressModule } from '../address/address.module';
import { CliService } from './cli.service';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), ConsoleModule, AddressModule],
  providers: [CliService],
  exports: [CliService]
})
export class CliModule {}
