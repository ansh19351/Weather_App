import { UserService } from "./user.service";
export declare class UserController {
    private UserService;
    constructor(UserService: UserService);
    getWeather(): Promise<any[]>;
}
