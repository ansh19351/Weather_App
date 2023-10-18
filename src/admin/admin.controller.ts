import { Body, Controller, ForbiddenException, Get, Post, Session} from '@nestjs/common';
import { AdminService } from './admin.service';
import { City } from './entities/city.entity';
import { Admin } from './entities/admin.entity';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}
    
    @Post('/signup')
    signup(@Body() addAdmin: Admin)
    {
      return this.adminService.signup(addAdmin);
    }
    
    @Post('/signin')
    async signin(@Body() addAdmin: Admin, @Session() session: any)
    {
      const admin = await this.adminService.signin(addAdmin);
      if(admin) {
          session.userId = admin.id;
      }
      return admin;
    }
    
    @Post('signout')
    signout(@Session() session: any)
    {
      session.userId = null;
      return "Log-Out";
    }

    @Post('/add')
    async add(@Body() addCity: City, @Session() session: any) 
    {
      if(session.userId === null)
      {
        return new ForbiddenException("You are not authorized to perform this action")
      }
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