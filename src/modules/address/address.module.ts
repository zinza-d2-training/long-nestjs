import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from 'src/entities/District.entity';
import { Province } from 'src/entities/Province.entity';
import { Ward } from 'src/entities/Ward.entity';
import { AddressController } from './address.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Ward])],
  controllers: [AddressController]
})
export class AddressModule {}
