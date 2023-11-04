import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller("user")
@ApiTags('City')
export class UserController
{
    constructor(private UserService : UserService){}
    @Get('/weather')
    @ApiOperation({ summary: 'Get weather' })
    @ApiResponse({ status: 200, description: 'Weather details of all cities' })
    getWeather()
    {
        return this.UserService.getWeather();
    }
    @Get('/cities')
    @ApiOperation({ summary: 'Get cities' })
    @ApiResponse({ status: 200, description: 'List of all cities across the world' })
    getCities()
    {
        return this.UserService.getCities();
    }
}