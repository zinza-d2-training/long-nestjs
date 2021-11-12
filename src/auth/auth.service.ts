import {
  BadRequestException,
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { User } from 'src/entities/User.entity';
import { UserService } from './../user/user.service';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/RegisterDto';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(REQUEST) private request: Request,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  getToken(): string {
    const bearerToken = this.request.headers.authorization;
    if (!bearerToken) {
      throw new UnauthorizedException();
    }
    return bearerToken.split(' ')[1];
  }

  async login(body: LoginDto): Promise<string> {
    const user = await this.validateUser(body.citizenId, body.password);
    return this.jwtService.sign({ id: user.id });
  }

  async register(body: RegisterDto): Promise<User> {
    const user = await this.userService.findOne({
      citizenId: body.citizenId
    });
    if (user) {
      throw new ConflictException('Citizen id was registered');
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const savedUser = await this.userService.create({
      ...body,
      password: hashedPassword
    });

    return savedUser;
  }

  async validateUser(
    citizenId: string,
    password: string
  ): Promise<User | null> {
    const user = await this.userService.findOne({ citizenId });
    if (!user) {
      throw await new BadRequestException('Citizen id is invalid!');
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      throw await new BadRequestException('Password is invalid!');
    }

    return user;
  }

  async logout() {
    const token = this.getToken();
    const decrypted = this.jwtService.verify(token);
    const expireTime = decrypted.exp - decrypted.iat;
    await this.cacheManager.set(token, token, { ttl: expireTime });
  }

  async checkBlackListToken(): Promise<any> {
    const token = this.getToken();
    const expired = !!(await this.cacheManager.get(token));
    if (expired) {
      throw new UnauthorizedException('Token is expired!');
    }
  }
}
