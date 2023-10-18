import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './admin/entities/city.entity';
import { Admin } from './admin/entities/admin.entity';
@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Marghat$0811',
      database: 'postgres',
      entities: [City,Admin],
      synchronize: true,
      logging: true,
    }),
  }), UserModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
