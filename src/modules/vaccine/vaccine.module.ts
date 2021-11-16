import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaccine } from 'src/entities/Vaccine.entity';
import { AuthModule } from '../auth/auth.module';
import { VaccineController } from './vaccine.controller';
import { VaccineService } from './vaccine.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccine]), AuthModule],
  controllers: [VaccineController],
  providers: [VaccineService]
})
export class VaccineModule {}
