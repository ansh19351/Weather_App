import { Body, Controller, Get, Post} from '@nestjs/common';
import { AdminService } from './admin.service';
import { City } from './entities/city.entity';


@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}
    @Post()
    async add(@Body() addCity: City) {
      const city = await this.adminService.add(addCity);
      if(!city) {
        return 'error in adding city';
      }
      return 'city added successfully';
    }
    @Get()
    async getAllCities(): Promise<City[]>
    {
      return this.adminService.getAllCities();
    }
}