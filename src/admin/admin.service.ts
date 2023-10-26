import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Admin } from './entities/admin.entity';
import { AdminDto } from './dtos/admin.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
    constructor(@InjectRepository(City) private CityRepository: Repository<City>, @InjectRepository(Admin) private AdminRepository: Repository<Admin>,) {}

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    
    async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
    
    async signup(admin: AdminDto): Promise<Admin>
    {
        var adm = admin;
        adm.password = await this.hashPassword(adm.password);
        return this.AdminRepository.save(this.AdminRepository.create(adm));
    }

    async signin(admin: AdminDto)
    {
        const users = await this.AdminRepository.find({where:{email:admin.email}});
        const [user] = users;
        const isPasswordValid = await this.comparePasswords(admin.password, user.password);
        if(!user || !isPasswordValid)
        {
            return null;
        }
        return user;
    }

    async add(city: City): Promise<City> 
    {
        return this.CityRepository.save(this.CityRepository.create(city));
    }
    
    async getAllCities()
    {
      return await this.CityRepository.find();
    }
}