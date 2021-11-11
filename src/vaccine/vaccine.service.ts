import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vaccine } from 'src/entities/Vaccine.entity';
import { IResponse } from 'src/interfaces/base';
import { Repository } from 'typeorm';
import { CreateVaccineDto } from './dto/CreateVaccineDto';
import { UpdateVaccineDto } from './dto/UpdateVaccineDto';

@Injectable()
export class VaccineService {
  constructor(
    @InjectRepository(Vaccine)
    private readonly vaccineRepository: Repository<Vaccine>,
  ) {}

  async findAll(): Promise<Vaccine[]> {
    const vaccines = await this.vaccineRepository.find();
    if (!vaccines.length) {
      throw new NotFoundException('Vaccine not found');
    }
    return vaccines;
  }

  async findOne(id: string) {
    const vaccine = await this.vaccineRepository.findOne(id);
    return vaccine;
  }

  async create(data: CreateVaccineDto): Promise<IResponse<Vaccine>> {
    const savedVaccine = await this.vaccineRepository.save(data);
    return {
      message: 'Save vaccine successfully',
      data: savedVaccine,
    };
  }

  async delete(id: string) {
    const vaccine = await this.vaccineRepository.findOne(id);
    if (!vaccine) {
      throw new NotFoundException('Vaccine not found!');
    }
    await this.vaccineRepository.delete(id);
  }

  async update(id: string, newData: UpdateVaccineDto): Promise<Vaccine> {
    try {
      await this.vaccineRepository.update(id, newData);
    } catch {
      throw new BadRequestException();
    }
    const newVaccine = await this.vaccineRepository.findOne(id);
    return newVaccine;
  }
}
