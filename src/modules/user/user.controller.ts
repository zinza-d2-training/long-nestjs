import {
  Body,
  Controller,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/entities/User.entity';
import { IResponse } from 'src/interfaces/base';
import { response } from 'src/shared/response';
import { AuthService } from '../auth/auth.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UpdateDto } from './dto/UpdateDto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Put()
  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Body() body: UpdateDto,
    @Req() req: Request
  ): Promise<IResponse<User>> {
    const user = req.user as User;

    return response(await this.userService.update(user.id, body));
  }
}
