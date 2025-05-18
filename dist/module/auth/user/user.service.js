"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const data_source_1 = require("../../../config/data-source");
const user_entity_1 = require("./dtos-entities/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UsersService {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(user_entity_1.UserEntity);
    }
    async findAll() {
        const results = await this.repo.find();
        return {
            page: 1,
            totalPages: 1,
            totalItems: 1,
            hasMore: false,
            results,
        };
    }
    async findOne(id) {
        return await this.repo.findOneBy({ id });
    }
    async create(dto) {
        const hashedPassword = await bcrypt_1.default.hash(dto.password, 10);
        const user = this.repo.create({ ...dto, password: hashedPassword });
        return await this.repo.save(user);
    }
    async update(id, dto) {
        const user = await this.repo.findOneBy({ id });
        if (!user)
            return null;
        // Si se envía un nuevo password, lo encriptamos
        if (dto.password) {
            dto.password = await bcrypt_1.default.hash(dto.password, 10);
        }
        Object.assign(user, dto);
        return await this.repo.save(user);
    }
    async remove(id) {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=user.service.js.map