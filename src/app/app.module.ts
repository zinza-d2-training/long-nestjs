import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ormconfig } from 'src/database/ormconfig';
import { UserModule } from 'src/user/user.module';
import { VaccineModule } from 'src/vaccine/vaccine.module';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    AuthModule,
    VaccineModule,
    CacheModule.register(),
  ],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
