"use strict";
// src/seed/data/shortener.seeder.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedShortener = void 0;
const data_source_1 = require("../../config/data-source");
const shortener_entity_1 = require("../../module/shortener/shortener.entity");
const seedShortener = async () => {
    try {
        const repo = data_source_1.AppDataSource.getRepository(shortener_entity_1.ShortUrlEntity);
        const data = [
            {
                originalUrl: "https://google.com",
                shortCode: "ggl123",
            },
            {
                originalUrl: "https://github.com",
                shortCode: "gh123",
            },
            {
                originalUrl: "https://openai.com",
                shortCode: "ai123",
            },
        ];
        for (const entry of data) {
            const existing = await repo.findOneBy({ shortCode: entry.shortCode });
            if (!existing) {
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