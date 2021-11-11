import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Vaccine } from 'src/entities/Vaccine.entity';
import { IResponse } from 'src/interfaces/base';
import { EnumRoles } from 'src/interfaces/roles';
import { CreateVaccineDto } from './dto/CreateVaccineDto';
import { UpdateVaccineDto } from './dto/UpdateVaccineDto';
import { VaccineService } from './vaccine.service';

@Controller('vaccines')
export class VaccineController {
  constructor(
    private readonly vaccineService: VaccineService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getAll(): Promise<IResponse<Vaccine[]>> {
    return {
      message: 'Fetch data successfully!',
      data: await this.vaccineService.findAll(),
    };
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createNewVaccine(
    @Body() body: CreateVaccineDto,
  ): Promise<IResponse<Vaccine>> {
    await this.authService.checkRole(EnumRoles.ADMIN);
    return await this.vaccineService.create(body);
  }

  @Delete('/:id')
  async deleteVaccine(@Param('id') id: string) {
    await this.authService.checkRole(EnumRoles.ADMIN);
    return await this.vaccineService.delete(id);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  async updateVaccine(@Body() body: UpdateVaccineDto, @Param('id') id: string) {
    await this.authService.checkRole(EnumRoles.ADMIN);
    return await this.vaccineService.update(id, body);
  }
}
