"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectUserSeeder = void 0;
const project_user_data_json_1 = __importDefault(require("./project-user.data.json"));
const data_source_1 = require("../../../config/data-source");
const user_entity_1 = require("../../../module/project/entities/user.entity");
const mappedData = project_user_data_json_1.default.map((item) => ({
    ...item,
    role: item.role,
}));
const projectUserSeeder = async () => {
    const repo = data_source_1.AppDataSource.getRepository(user_entity_1.ProjectUserEntity);
    const count = await repo.count();
    if (count === 0) {
        await repo.save(mappedData);
        console.log("🌱 ProjectUser seed complete ✅");
    }
    else {
        console.log("ℹ️ ProjectUser table already has data. Seed skipped.");
    }
};
exports.projectUserSeeder = projectUserSeeder;
//# sourceMappingURL=project-user.seed.js.map