import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ormconfig } from 'src/database/ormconfig';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserModule } from 'src/user/user.module';
import { VaccineModule } from 'src/vaccine/vaccine.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    AuthModule,
    VaccineModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
