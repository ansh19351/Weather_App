import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller("user")
export class UserController
{
    constructor(private UserService : UserService){}
    @Get('/weather')
    @ApiOperation({ summary: 'Get weather' })
    @ApiResponse({ status: 200, description: 'List weather of all cities' })
    getWeather()
    {
        return this.UserService.getWeather();
    }
    @Get('/cities')
    getCities()
    {
        return this.UserService.getCities();
    }
}