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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const city_entity_1 = require("./entities/city.entity");
const swagger_1 = require("@nestjs/swagger");
const admin_dto_1 = require("./dtos/admin.dto");
const common_2 = require("@nestjs/common");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    signup(request) {
        if (request.session.admin_id === null) {
            return { "message": "You are not authorized to access this page" };
        }
        return this.adminService.signup(request.body);
    }
    async signin(request) {
        const admin = await this.adminService.signin(request.body);
        if (admin) {
            request.session.admin_id = admin.id;
        }
        else {
            request.session.admin_id = null;
            throw new common_1.HttpException('Invalid Login Credentials', common_2.HttpStatus.UNAUTHORIZED);
        }
        return admin;
    }
    signout(request) {
        if (request.session.admin_id === null) {
            throw new common_1.HttpException('Unauthorized', common_2.HttpStatus.UNAUTHORIZED);
        }
        request.session.admin_id = null;
        return { "message": "You are logged out sucessfully" };
    }
    async add(request) {
        if (request.session.admin_id === null) {
            throw new common_1.ForbiddenException("You are not authorized to perform this action");
        }
        const city = await this.adminService.add(request.body);
        if (!city) {
            return { "message": "Error in adding city" };
        }
        return { "message": "City Added Successfully" };
    }
    async getAllCities() {
        return this.adminService.getAllCities();
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOperation)({ summary: 'Admin Sign Up' }),
    (0, swagger_1.ApiBody)({ type: admin_dto_1.AdminDto, description: 'Admin Sign Up' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sign Up Successful' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, swagger_1.ApiOperation)({ summary: 'Admin Login' }),
    (0, swagger_1.ApiBody)({ type: admin_dto_1.AdminDto, description: 'Admin login credentials' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Admin logged in' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "signin", null);
__decorate([
    (0, common_1.Post)('signout'),
    (0, swagger_1.ApiOperation)({ summary: 'User signout' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User signed out successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "signout", null);
__decorate([
    (0, common_1.Post)('add'),
    (0, swagger_1.ApiOperation)({ summary: 'Protected add city route (requires authentication via session)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Protected route accessed' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiBody)({ type: city_entity_1.City, description: 'Admin login credentials' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "add", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllCities", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, swagger_1.ApiTags)('Admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map