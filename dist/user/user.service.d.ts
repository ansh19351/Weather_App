import { AdminService } from "../admin/admin.service";
export declare class UserService {
    private adminService;
    constructor(adminService: AdminService);
    getWeather(): Promise<any[]>;
    getCities(): Promise<any>;
}
