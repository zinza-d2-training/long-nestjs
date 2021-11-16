import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Province } from 'src/entities/Province.entity';
import { IResponse } from 'src/interfaces/base';
import { response } from 'src/shared/response';
import { AddressService } from './address.service';
import { AddDistrictDto } from './dto/AddDistrict.dto';
import { AddProvinceDto } from './dto/AddProvince.dto';
import { AddWardDto } from './dto/AddWard.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('provinces')
  @UsePipes(new ValidationPipe())
  async addProvince(@Body() body: AddProvinceDto[]) {
    return await this.addressService.addProvinces(body);
  }

  @Post('districts')
  @UsePipes(new ValidationPipe())
  async addDistrict(@Body() body: AddDistrictDto[]) {
    return await this.addressService.addDistricts(body);
  }

  @Post('wards')
  @UsePipes(new ValidationPipe())
  async addWard(@Body() body: AddWardDto[]) {
    return await this.addressService.addWards(body);
  }

  @Get()
  async getAddress(): Promise<IResponse<Province[]>> {
    return response(await this.addressService.getAddress());
  }
}
