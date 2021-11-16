import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from 'src/database/ormconfig';
import { AddressModule } from 'src/modules/address/address.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AddressModule
  ]
})
export class AppModule {}
