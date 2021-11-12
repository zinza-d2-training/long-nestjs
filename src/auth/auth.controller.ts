import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { IResponse } from 'src/interfaces/base';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/RegisterDto';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  @UsePipes(new ValidationPipe())
  async login(@Body() body: LoginDto): Promise<IResponse<{ token: string }>> {
    return await this.authService.login(body);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() body: RegisterDto): Promise<IResponse<User>> {
    return await this.authService.register(body);
  }

  @Get('me')
  async getMe(): Promise<IResponse<User>> {
    const user = await this.authService.validateToken();
    return {
      message: 'Fetch user data successful',
      data: user
    };
  }

  @Post('logout')
  async logout() {
    await this.authService.validateToken();
    await this.authService.logout();
  }
}
