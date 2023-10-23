import { AdminService } from './admin.service';
import { City } from './entities/city.entity';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    signup(request: any): Promise<import("./entities/admin.entity").Admin>;
    signin(request: any): Promise<import("./entities/admin.entity").Admin>;
    signout(request: any): string;
    add(request: any): Promise<"Error in adding city" | "City Added Successfully!">;
    getAllCities(): Promise<City[]>;
}
