import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(City)
        private CityRepository: Repository<City>,
    ) {}
    async add(city: City): Promise<City> 
    {
        return this.CityRepository.save(
        this.CityRepository.create(city));
    }
    async getAllCities(): Promise<City[]>
    {
      return this.CityRepository.find();
    }
}