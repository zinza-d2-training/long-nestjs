import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from 'src/database/ormconfig';
import { RolesGuard } from 'src/guards/roles.guard';
import { AddressModule } from 'src/modules/address/address.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { VaccineModule } from 'src/modules/vaccine/vaccine.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    AuthModule,
    VaccineModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AddressModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
