import { Injectable } from "@nestjs/common";
import axios, { AxiosResponse } from 'axios';
import { AdminService } from "../admin/admin.service";
const cities = require('cities.json');

@Injectable()
export class UserService
{
    constructor(private adminService: AdminService){};
    async getWeather()
    {
        const apiKey = process.env.API_KEY;
        const cities = await this.adminService.getAllCities();
        const openWeatherBaseUrl = process.env.API_BASE_URL;
        const weatherData = [];
        for (const city of cities) {
            try {
            const response = await axios.get(openWeatherBaseUrl, {
                params: {
                q: city.name,
                appid: apiKey,
                },
            });
            const cityWeather = {
                city: city,
                temperature: response.data.main.temp,
                weatherDescription: response.data.weather[0].description,
            };
            weatherData.push(cityWeather);
            } 
            catch (error) 
            {
                console.error(`Failed to fetch weather data for ${city}: ${error.message}`);
            }
        }
        return weatherData;
    }
    async getCities()
    {
        return cities;
    }
}