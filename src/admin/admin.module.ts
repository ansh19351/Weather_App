import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

