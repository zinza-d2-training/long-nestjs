import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Vaccine } from 'src/entities/Vaccine.entity';
import { VaccineController } from './vaccine.controller';
import { VaccineService } from './vaccine.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccine]), AuthModule],
  controllers: [VaccineController],
  providers: [VaccineService]
})
export class VaccineModule {}
