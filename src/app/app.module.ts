import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from 'src/database/ormconfig';
import { AddressModule } from 'src/modules/address/address.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AddressModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: __dirname + '/../../upload'
    }),
    UserModule
  ]
})
export class AppModule {}
