import { UserService } from './../user/user.service';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { IResponse } from 'src/interfaces/base';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/RegisterDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SECRET_KEY } from 'src/constants/jwt';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { EnumRoles } from 'src/interfaces/roles';
import { LoginDto } from './dto/LoginDto';
import { AppService } from 'src/app/app.service';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(REQUEST) private request: Request,
    private readonly appService: AppService,
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
    await this.appService.setCacheValue(token, token, 3600);
  }

  async checkTokenExpired(): Promise<any> {
    const token = this.getToken();
    const expired = !!(await this.appService.getCacheValue(token));
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
