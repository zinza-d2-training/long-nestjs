import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from 'src/entities/District.entity';
import { Province } from 'src/entities/Province.entity';
import { Ward } from 'src/entities/Ward.entity';
import { Repository } from 'typeorm';
import { AddDistrictDto } from './dto/AddDistrict.dto';
import { AddProvinceDto } from './dto/AddProvince.dto';
import { AddWardDto } from './dto/AddWard.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepo: Repository<Province>,
    @InjectRepository(District)
    private readonly districtRepo: Repository<District>,
    @InjectRepository(Ward)
    private readonly wardRepo: Repository<Ward>
  ) {}

  async addProvince(data: AddProvinceDto[]) {
    return await this.provinceRepo
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute();
  }

  async addDistrict(data: AddDistrictDto[]) {
    return await this.districtRepo
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute();
  }

  async addWard(data: AddWardDto[]) {
    return await this.wardRepo
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute();
  }

  async getAddress(): Promise<Province[]> {
    return await this.provinceRepo
      .createQueryBuilder('province')
      .leftJoinAndSelect('province.districts', 'district')
      .leftJoinAndSelect('district.wards', 'ward')
      .getMany();
  }
}
