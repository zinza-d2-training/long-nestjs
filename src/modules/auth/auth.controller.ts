import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/configs/multerConfig';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/Register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly authService: AuthService
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
}
