import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
export declare class AdminService {
    private CityRepository;
    constructor(CityRepository: Repository<City>);
    add(city: City): Promise<City>;
    getAllCities(): Promise<City[]>;
}
