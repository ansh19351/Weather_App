import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController
{
    constructor(private UserService : UserService){}
    @Get('/weather')
    getWeather()
    {
        return this.UserService.getWeather();
    }
}