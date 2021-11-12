import {
  BadRequestException,
  ConflictException,
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dto/RegisterDto';
import { User } from 'src/entities/User.entity';
import { getConnection, Repository } from 'typeorm';
import { UpdateDto } from './dto/UpdateDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async findOne(conditions: Partial<User>): Promise<User> {
    return await this.userRepository.findOne(conditions);
  }

  async create(data: RegisterDto): Promise<User> {
    return await this.userRepository.save(data);
  }

  async update(id: string, newData: UpdateDto): Promise<User> {
    const conflictUsers = await this.userRepository
      .createQueryBuilder()
      .where('id != :id', { id })
      .andWhere('citizen_id = :citizenId', { citizenId: newData.citizenId })
      .execute();

    if (conflictUsers.length) {
      throw new ConflictException('Citizen id is registered!');
    }
    try {
      await this.userRepository.update(id, newData);
    } catch {
      throw new BadRequestException();
    }

    return await this.userRepository.findOne(id);
  }
}
