import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsoleService } from 'nestjs-console';
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
    private readonly wardRepo: Repository<Ward>,
    private readonly consoleService: ConsoleService
  ) {
    const cli = this.consoleService.getCli();

    // create a single command (See [npm commander arguments/options for more details])
    this.consoleService.createCommand(
      {
        command: 'list <directory>',
        description: 'description'
      },
      this.importData,
      cli // attach the command to the cli
    );
  }

  async addProvince(data: AddProvinceDto): Promise<Province> {
    return await this.provinceRepo.save({ id: data.id, name: data.name });
  }

  async addDistrict(data: AddDistrictDto): Promise<District> {
    return await this.districtRepo.save({
      id: data.id,
      name: data.name,
      provinceId: data.provinceId
    });
  }

  async addWard(data: AddWardDto): Promise<Ward> {
    return await this.wardRepo.save({
      id: data.id,
      name: data.name,
      districtId: data.districtId
    });
  }

  async getAddress(): Promise<Province[]> {
    return await this.provinceRepo
      .createQueryBuilder('province')
      .leftJoinAndSelect('province.districts', 'district')
      .leftJoinAndSelect('district.wards', 'ward')
      .getMany();
  }

  async importData() {
    console.log(123);
  }
}
