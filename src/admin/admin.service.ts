import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    constructor(@InjectRepository(City) private CityRepository: Repository<City>, @InjectRepository(Admin) private AdminRepository: Repository<Admin>,) {}
    
    async signup(admin: Admin): Promise<Admin>
    {
        return this.AdminRepository.save(
        this.AdminRepository.create(admin));
    }

    async signin(admin: Admin)
    {
        const users = await this.AdminRepository.find({where:{email:admin.email}});
        const [user] = users;
        if(!user || user.password !== admin.password)
        {
            return null;
        }
        return user;
    }

    async add(city: City): Promise<City> 
    {
        return this.CityRepository.save(
        this.CityRepository.create(city));
    }
    
    async getAllCities()
    {
      return await this.CityRepository.find();
    }
}