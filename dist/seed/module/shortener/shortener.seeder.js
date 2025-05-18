"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedShortener = void 0;
const shortener_data_json_1 = __importDefault(require("./shortener.data.json"));
const data_source_1 = require("../../../config/data-source");
const shortener_entity_1 = require("../../../module/shortener/entities/shortener.entity");
const seedShortener = async () => {
    const repo = data_source_1.AppDataSource.getRepository(shortener_entity_1.ShortenerEntity);
    const count = await repo.count();
    if (count === 0) {
        await repo.save(shortener_data_json_1.default);
        console.log("🌱 shortenerSeeder seed complete ✅");
    }
    else {
        console.log("ℹ️ shortenerSeeder table already has data. Seed skipped.");
    }
};
exports.seedShortener = seedShortener;
//# sourceMappingURL=shortener.seeder.js.map