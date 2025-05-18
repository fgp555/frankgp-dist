"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthUserService = void 0;
// src/module/oauth/oauth-user.service.ts
const data_source_1 = require("../../../config/data-source");
const oauth_user_entity_1 = require("./entities/oauth-user.entity");
class OAuthUserService {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(oauth_user_entity_1.OAuthUserEntity);
    }
    async findOrCreate(googleProfile) {
        let user = await this.repo.findOne({ where: { googleId: googleProfile.googleId } });
        if (!user) {
            user = this.repo.create(googleProfile);
            await this.repo.save(user);
        }
        return user;
    }
    async findAll() {
        return this.repo.find();
    }
    async findById(id) {
        return this.repo.findOne({ where: { id } });
    }
    async remove(id) {
        const user = await this.findById(id);
        if (user)
            await this.repo.remove(user);
    }
}
exports.OAuthUserService = OAuthUserService;
//# sourceMappingURL=oauth-user.service.js.map