import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(conditions: Partial<User>): Promise<User> {
    return await this.userRepo.findOne(conditions);
  }

  async create(user): Promise<User> {
    return await this.userRepo.save(user);
  }
}
