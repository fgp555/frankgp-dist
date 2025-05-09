"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedShortener = void 0;
const data_source_1 = require("../../config/data-source");
const shortener_entity_1 = require("../../module/shortener/entities/shortener.entity");
const shortener_data_json_1 = __importDefault(require("./shortener.data.json"));
const seedShortener = async () => {
    try {
        const repo = data_source_1.AppDataSource.getRepository(shortener_entity_1.ShortUrlEntity);
        for (const entry of shortener_data_json_1.default) {
            const exists = await repo.findOneBy({ shortCode: entry.shortCode });
            if (!exists) {
                await repo.save(repo.create(entry));
                console.log(`✔️ Inserted shortCode: ${entry.shortCode}`);
            }
            else {
                console.log(`⚠️ Already exists: ${entry.shortCode}`);
            }
        }
        console.log("✅ Shortener seed complete");
    }
    catch (error) {
        console.error("❌ Shortener seed failed", error);
        process.exit(1);
    }
};
exports.seedShortener = seedShortener;
//# sourceMappingURL=shortener.seeder.js.map