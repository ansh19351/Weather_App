"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const admin_service_1 = require("../admin/admin.service");
let UserService = class UserService {
    constructor(adminService) {
        this.adminService = adminService;
    }
    ;
    async getWeather() {
        const apiKey = '4f2efa67ddc44f2a9ad1e2d43b3e79ab';
        const cities = await this.adminService.getAllCities();
        const openWeatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
        const weatherData = [];
        for (const city of cities) {
            try {
                const response = await axios_1.default.get(openWeatherBaseUrl, {
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
            catch (error) {
                console.error(`Failed to fetch weather data for ${city}: ${error.message}`);
            }
        }
        return weatherData;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], UserService);
//# sourceMappingURL=user.service.js.map