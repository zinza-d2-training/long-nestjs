import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from 'src/entities/District.entity';
import { Province } from 'src/entities/Province.entity';
import { Ward } from 'src/entities/Ward.entity';
import { Repository } from 'typeorm';
import { AddDistrictDto } from './dto/AddDistrict.dto';
import { AddProvinceDto } from './dto/AddProvince.dto';
import { AddWardDto } from './dto/AddWard.dto';

@Controller('address')
export class AddressController {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepo: Repository<Province>,
    @InjectRepository(District)
    private readonly districtRepo: Repository<District>,
    @InjectRepository(Ward)
    private readonly wardRepo: Repository<Ward>
  ) {}

  @Post('provinces')
  @UsePipes(new ValidationPipe())
  async addProvince(@Body() body: AddProvinceDto) {
    return await this.provinceRepo.save(body);
  }

  @Post('districts')
  @UsePipes(new ValidationPipe())
  async addDistrict(@Body() body: AddDistrictDto) {
    return await this.districtRepo.save(body);
  }

  @Post('wards')
  @UsePipes(new ValidationPipe())
  async addWard(@Body() body: AddWardDto) {
    return await this.wardRepo.save(body);
  }
}
