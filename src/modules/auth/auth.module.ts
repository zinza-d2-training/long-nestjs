import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configs } from 'src/configs';
import { User } from 'src/entities';
import { CitizenIdImage } from 'src/entities/CitizenIdImage.entity';
import { File } from 'src/entities/File.entity';
import { Image } from 'src/entities/Image.entity';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, File, Image, CitizenIdImage]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: configs.secretKey,
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
