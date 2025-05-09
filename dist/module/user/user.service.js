"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const data_source_1 = require("../../config/data-source");
const user_entity_1 = require("./dtos-entities/user.entity");
class UsersService {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(user_entity_1.UserEntity);
    }
    async findAll() {
        return await this.repo.find();
    }
    async findOne(id) {
        return await this.repo.findOneBy({ id });
    }
    async create(dto) {
        const user = this.repo.create(dto);
        return await this.repo.save(user);
    }
    async update(id, dto) {
        const user = await this.repo.findOneBy({ id });
        if (!user)
            return null;
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