import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FilesInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/configs/multerConfig';
import { User } from 'src/entities';
import { response } from 'src/shared/response';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/Register.dto';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Post('register')
  @UseInterceptors(
    FilesInterceptor('file[]', 2, {
      dest: './upload',
      storage: diskStorage({
        destination: './upload',
        filename: editFileName
      }),
      fileFilter: imageFileFilter
    })
  )
  @UsePipes(new ValidationPipe())
  async register(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: RegisterDto
  ) {
    return await this.authService.register(files, body);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    const user = req.user as User;
    const access_token = this.jwtService.sign({ id: user.id });
    return response({ access_token });
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async getMe(@Req() req: Request) {
    return response(req.user);
  }
}
