import { City } from './entities/city.entity';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
export declare class AdminService {
    private CityRepository;
    private AdminRepository;
    constructor(CityRepository: Repository<City>, AdminRepository: Repository<Admin>);
    hashPassword(password: string): Promise<string>;
    comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean>;
    signup(admin: Admin): Promise<Admin>;
    signin(admin: Admin): Promise<Admin>;
    add(city: City): Promise<City>;
    getAllCities(): Promise<City[]>;
}
