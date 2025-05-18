"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAcademyCategory = void 0;
const data_source_1 = require("../../../config/data-source");
const category_entity_1 = require("../../../module/academy/dtos-entities/category.entity");
const categories_data_json_1 = __importDefault(require("./categories.data.json"));
const seedAcademyCategory = async () => {
    const repo = data_source_1.AppDataSource.getRepository(category_entity_1.CategoryEntity);
    const count = await repo.count();
    if (count === 0) {
        await repo.save(categories_data_json_1.default);
        console.log("🌱 CategorySeeder seed complete ✅");
    }
    else {
        console.log("ℹ️ CategorySeeder table already has data. Seed skipped.");
    }
};
exports.seedAcademyCategory = seedAcademyCategory;
//# sourceMappingURL=categories.seed.js.map