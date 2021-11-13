import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/entities/User.entity';
import { IResponse } from 'src/interfaces/base';
import { response } from 'src/shared/response';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/RegisterDto';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() body: LoginDto): Promise<IResponse<{ token: string }>> {
    return response({ token: await this.authService.login(body) });
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() body: RegisterDto): Promise<IResponse<User>> {
    return response(await this.authService.register(body));
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async getMe(@Req() req: Request): Promise<IResponse<User>> {
    const user = req.user as User;
    return response(user);
  }
}
