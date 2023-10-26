import { Controller, ForbiddenException, Get, Post, Request } from '@nestjs/common';
import { AdminService } from './admin.service';
import { City } from './entities/city.entity';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}
    
    @Post('signup')
    signup(@Request() request)
    {
      if(request.admin_id === null)
      {
        return {"message":"You are not authorized to access this page"};
      }
      return this.adminService.signup(request.body);
    }
    
    @Post('signin')
    async signin(@Request() request)
    {
      const admin = await this.adminService.signin(request.body);
      if(admin) {
          request.session.admin_id = admin.id;
      }
      else
      {
        request.session.admin_id = null;
      }
      return admin;
    }
    
    @Post('signout')
    signout(@Request() request)
    {
      request.session.admin_id = null;
      return {"message":"You are logged out sucessfully"};
    }

    @Post('add')
    async add(@Request() request) {
      if (request.session.admin_id === null) {
        throw new ForbiddenException("You are not authorized to perform this action");
      }
      const city = await this.adminService.add(request.body);
      if (!city) {
        return {"message":"Error in adding city"};
      }
      return {"message":"City Added Successfully"};
    }

    @Get()
    async getAllCities(): Promise<City[]>
    {
      return this.adminService.getAllCities();
    }
}