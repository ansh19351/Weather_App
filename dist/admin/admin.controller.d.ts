import { ForbiddenException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { City } from './entities/city.entity';
import { Admin } from './entities/admin.entity';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    signup(addAdmin: Admin): Promise<Admin>;
    signin(addAdmin: Admin, session: any): Promise<Admin>;
    signout(session: any): string;
    add(addCity: City, session: any): Promise<ForbiddenException | "error in adding city" | "city added successfully">;
    getAllCities(): Promise<City[]>;
}
