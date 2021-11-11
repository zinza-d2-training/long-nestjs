import {
  BadRequestException,
  CACHE_MANAGER,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { SECRET_KEY } from 'src/constants/jwt';
import { User } from 'src/entities/User.entity';
import { IResponse } from 'src/interfaces/base';
import { EnumRoles } from 'src/interfaces/roles';
import { UserService } from './../user/user.service';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/RegisterDto';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(REQUEST) private request: Request,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  getToken(): string {
    const bearerToken = this.request.headers.authorization;
    if (!bearerToken) {
      throw new UnauthorizedException();
    }
    return bearerToken.split(' ')[1];
  }

  async login(body: LoginDto): Promise<IResponse<{ token: string }>> {
    const user = await this.validateUser(body.citizenId, body.password);
    const token = this.jwtService.sign({ id: user.id });
    return {
      message: 'Login successful',
      data: {
        token,
      },
    };
  }

  async register(body: RegisterDto): Promise<IResponse<User>> {
    const user = await this.userService.findOne({
      citizenId: body.citizenId,
    });
    if (user) {
      throw new ConflictException('Citizen id was registered');
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const savedUser = await this.userService.create({
      ...body,
      password: hashedPassword,
    });

    return {
      message: 'Register successfully',
      data: savedUser,
    };
  }

  async validateUser(
    citizenId: string,
    _password: string,
  ): Promise<User | null> {
    const user = await this.userService.findOne({ citizenId });
    if (!user) {
      throw await new BadRequestException('Citizen id is invalid!');
    }
    const validPass = await bcrypt.compare(_password, user.password);
    if (!validPass) {
      throw await new BadRequestException('Password is invalid!');
    }

    return user;
  }

  async logout() {
    const token = this.getToken();
    await this.cacheManager.set(token, token, { ttl: 3600 });
  }

  async checkTokenExpired(): Promise<any> {
    const token = this.getToken();
    const expired = !!(await this.cacheManager.get(token));
    if (expired) {
      throw new BadRequestException('Token is expired!');
    }
  }

  async validateToken(): Promise<User> {
    const token = this.getToken();
    await this.checkTokenExpired();
    let decrypt;
    try {
      decrypt = this.jwtService.verify(token, {
        secret: SECRET_KEY,
      });
    } catch {
      throw new BadRequestException('Token is expired!');
    }
    return await this.userService.findOne(decrypt.id);
  }

  async checkRole(role: EnumRoles): Promise<boolean> {
    const user = await this.validateToken();
    if (user.role !== role) {
      throw new ForbiddenException(`Need ${EnumRoles[role]} role`);
    }
    return true;
  }
}
