import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { District } from 'src/entities/District.entity';
import { Province } from 'src/entities/Province.entity';
import { Ward } from 'src/entities/Ward.entity';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Province, District, Ward]),
    ConsoleModule
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService]
})
export class AddressModule {}
