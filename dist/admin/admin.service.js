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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const city_entity_1 = require("./entities/city.entity");
const admin_entity_1 = require("./entities/admin.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let AdminService = class AdminService {
    constructor(CityRepository, AdminRepository) {
        this.CityRepository = CityRepository;
        this.AdminRepository = AdminRepository;
    }
    async hashPassword(password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    async comparePasswords(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
    async signup(admin) {
        var adm = admin;
        adm.password = await this.hashPassword(adm.password);
        return this.AdminRepository.save(this.AdminRepository.create(adm));
    }
    async signin(admin) {
        const users = await this.AdminRepository.find({ where: { email: admin.email } });
        const [user] = users;
        const isPasswordValid = await this.comparePasswords(admin.password, user.password);
        if (!user || !isPasswordValid) {
            return null;
        }
        return user;
    }
    async add(city) {
        return this.CityRepository.save(this.CityRepository.create(city));
    }
    async getAllCities() {
        return await this.CityRepository.find();
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(city_entity_1.City)),
    __param(1, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository, typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map