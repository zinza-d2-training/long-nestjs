import {
  Body,
  Controller,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/entities/User.entity';
import { IResponse } from 'src/interfaces/base';
import { UpdateDto } from './dto/UpdateDto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Put()
  @UsePipes(new ValidationPipe())
  async updateUser(@Body() body: UpdateDto): Promise<IResponse<User>> {
    const user = await this.authService.validateToken();
    return await this.userService.update(user.id, body);
  }
}
