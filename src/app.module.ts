import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './admin/entities/city.entity';
import { Admin } from './admin/entities/admin.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true,
    }),TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'postgres',
      host: "localhost",
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [City,Admin],
      synchronize: true,
      logging: true,
    }),
  }), UserModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
