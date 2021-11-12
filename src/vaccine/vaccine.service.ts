import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vaccine } from 'src/entities/Vaccine.entity';
import { Repository } from 'typeorm';
import { CreateVaccineDto } from './dto/CreateVaccineDto';
import { UpdateVaccineDto } from './dto/UpdateVaccineDto';

@Injectable()
export class VaccineService {
  constructor(
    @InjectRepository(Vaccine)
    private readonly vaccineRepository: Repository<Vaccine>
  ) {}

  async findAll(): Promise<Vaccine[]> {
    return await this.vaccineRepository.find();
  }

  async findOne(id: string): Promise<Vaccine> {
    return await this.vaccineRepository.findOne(id);
  }

  async create(data: CreateVaccineDto): Promise<Vaccine> {
    return await this.vaccineRepository.save(data);
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
    return await this.vaccineRepository.findOne(id);
  }
}
