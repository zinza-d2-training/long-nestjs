import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/RegisterDto';
import { UpdateDto } from './dto/UpdateDto';
import { IResponse } from 'src/interfaces/base';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(conditions: Partial<User>): Promise<User> {
    return await this.userRepository.findOne(conditions);
  }

  async create(data: RegisterDto): Promise<User> {
    const savedUser = await this.userRepository.save(data);
    return savedUser;
  }

  async update(id: string, newData: UpdateDto): Promise<IResponse<User>> {
    const user = await this.userRepository.findOne({
      citizenId: newData.citizenId,
    });
    if (user && user.id != id) {
      throw new ConflictException('Citizen id is registered!');
    }
    try {
      await this.userRepository.update(id, newData);
    } catch {
      throw new BadRequestException();
    }
    const newUser = await this.userRepository.findOne(id);
    return {
      message: 'Update successfully',
      data: newUser,
    };
  }
}
