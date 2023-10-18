import { Injectable } from "@nestjs/common";
import axios, { AxiosResponse } from 'axios';
import { AdminService } from "../admin/admin.service";

@Injectable()
export class UserService
{
    constructor(private adminService: AdminService){};
    async getWeather()
    {
        const apiKey = '4f2efa67ddc44f2a9ad1e2d43b3e79ab';
        const cities = await this.adminService.getAllCities();
        const openWeatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
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
            } catch (error) {
            console.error(`Failed to fetch weather data for ${city}: ${error.message}`);
            }
        }
        return weatherData;
    }
}