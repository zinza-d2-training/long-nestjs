import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { origin } from 'src/configs';
import { User } from 'src/entities';
import { CitizenIdImage } from 'src/entities/CitizenIdImage.entity';
import { File } from 'src/entities/File.entity';
import { Image } from 'src/entities/Image.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/Register.dto';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Image) private readonly imageRepo: Repository<Image>,
    @InjectRepository(File) private readonly fileRepo: Repository<File>,
    @InjectRepository(CitizenIdImage)
    private readonly citizenIdImageRepo: Repository<CitizenIdImage>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly jwtService: JwtService
  ) {}

  async register(files: Array<Express.Multer.File>, data: RegisterDto) {
    const userExisted = await this.userService.findOne({
      citizenId: data.citizenId
    });
    if (userExisted) {
      throw new ConflictException('Citizen id was registered!');
    }
    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);
    const newUser = {
      ...data,
      password: hashedPassword
    };

    const savedUser = await this.userService.create(newUser);
    const savedCitizenImage = await this.citizenIdImageRepo.save({
      userId: savedUser.id
    });
    const savedFiles = await this.fileRepo
      .createQueryBuilder()
      .insert()
      .values(
        files.map((file) => ({
          path: origin + '/' + file.filename,
          fileName: file.filename
        }))
      )
      .execute();
    await this.imageRepo
      .createQueryBuilder()
      .insert()
      .values(
        savedFiles.identifiers.map(({ id }) => ({
          citizenImageId: savedCitizenImage.id,
          fileId: id
        }))
      )
      .execute();
    return savedUser;
  }

  async validateUser(citizenId: string, password: string): Promise<User> {
    const user = await this.userService.findOne({ citizenId });
    if (!user) {
      return null;
    }

    if (await bcrypt.compare(password, user.password)) {
      return user;
    }

    throw null;
  }

  async logout(token: string) {
    const decrypt = this.jwtService.verify(token);
    const expiredTime = (decrypt.exp - decrypt.iat) as number;
    await this.cacheManager.set(token, 'loggedOut', { ttl: expiredTime });
  }

  async checkTokenExpired(token: string): Promise<boolean> {
    const isExpired = !!(await this.cacheManager.get(token));
    if (isExpired) {
      throw new UnauthorizedException('Token is expired!');
    }
    return true;
  }
}
