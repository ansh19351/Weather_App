import { Controller, ForbiddenException, Get, HttpException, Post, Request } from '@nestjs/common';
import { AdminService } from './admin.service';
import { City } from './entities/city.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AdminDto } from './dtos/admin.dto';
import { HttpStatus } from '@nestjs/common';

@ApiTags('admin')
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
    @ApiOperation({ summary: 'Admin Login' })
    @ApiBody({ type: AdminDto, description: 'Admin login credentials' })
    @ApiResponse({ status: 200, description: 'Admin logged in' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async signin(@Request() request)
    {
      const admin = await this.adminService.signin(request.body);
      if(admin) {
          request.session.admin_id = admin.id;
      }
      else
      {
        request.session.admin_id = null;
        throw new HttpException('Invalid Login Credentials', HttpStatus.UNAUTHORIZED);

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
    @ApiOperation({ summary: 'Protected add city route (requires authentication via session)' })
    @ApiResponse({ status: 200, description: 'Protected route accessed' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBody({ type: City, description: 'Admin login credentials' })
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