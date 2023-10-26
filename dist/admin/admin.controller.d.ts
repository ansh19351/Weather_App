import { AdminService } from './admin.service';
import { City } from './entities/city.entity';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    signup(request: any): Promise<import("./entities/admin.entity").Admin> | {
        message: string;
    };
    signin(request: any): Promise<import("./entities/admin.entity").Admin>;
    signout(request: any): {
        message: string;
    };
    add(request: any): Promise<{
        message: string;
    }>;
    getAllCities(): Promise<City[]>;
}
