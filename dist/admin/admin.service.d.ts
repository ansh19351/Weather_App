import { City } from './entities/city.entity';
import { Admin } from './entities/admin.entity';
import { AdminDto } from './dtos/admin.dto';
import { Repository } from 'typeorm';
export declare class AdminService {
    private CityRepository;
    private AdminRepository;
    constructor(CityRepository: Repository<City>, AdminRepository: Repository<Admin>);
    hashPassword(password: string): Promise<string>;
    comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean>;
    signup(admin: AdminDto): Promise<Admin>;
    signin(admin: AdminDto): Promise<Admin>;
    add(city: City): Promise<City>;
    getAllCities(): Promise<City[]>;
}
