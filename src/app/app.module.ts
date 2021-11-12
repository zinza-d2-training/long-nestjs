import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ormconfig } from 'src/database/ormconfig';
import { UserModule } from 'src/user/user.module';
import { VaccineModule } from 'src/vaccine/vaccine.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    AuthModule,
    VaccineModule
  ]
})
export class AppModule {}
