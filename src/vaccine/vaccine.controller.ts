import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Auth } from 'src/decorators/auth.decorator';
import { Vaccine } from 'src/entities/Vaccine.entity';
import { IResponse } from 'src/interfaces/base';
import { EnumRoles } from 'src/interfaces/roles';
import { response } from 'src/shared/response';
import { CreateVaccineDto } from './dto/CreateVaccineDto';
import { UpdateVaccineDto } from './dto/UpdateVaccineDto';
import { VaccineService } from './vaccine.service';

@Controller('vaccines')
export class VaccineController {
  constructor(
    private readonly vaccineService: VaccineService,
    private readonly authService: AuthService
  ) {}

  @Get()
  async getAll(): Promise<IResponse<Vaccine[]>> {
    return response(await this.vaccineService.findAll());
  }

  @Post()
  @Auth(EnumRoles.ADMIN)
  @UsePipes(new ValidationPipe())
  async createNewVaccine(
    @Body() body: CreateVaccineDto
  ): Promise<IResponse<Vaccine>> {
    await this.authService.checkBlackListToken();
    return response(await this.vaccineService.create(body));
  }

  @Delete('/:id')
  @Auth(EnumRoles.ADMIN)
  async deleteVaccine(@Param('id') id: string) {
    await this.authService.checkBlackListToken();
    await this.vaccineService.delete(id);
  }

  @Put('/:id')
  @Auth(EnumRoles.ADMIN)
  @UsePipes(new ValidationPipe())
  async updateVaccine(
    @Body() body: UpdateVaccineDto,
    @Param('id') id: string
  ): Promise<IResponse<Vaccine>> {
    await this.authService.checkBlackListToken();
    return response(await this.vaccineService.update(id, body));
  }
}
