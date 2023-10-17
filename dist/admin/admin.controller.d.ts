import { AdminService } from './admin.service';
import { City } from './entities/city.entity';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    add(addCity: City): Promise<"error in adding city" | "city added successfully">;
    getAllCities(): Promise<City[]>;
}
