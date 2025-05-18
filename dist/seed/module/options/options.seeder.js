"use strict";
// import { OptionsEntity } from "../../module/options/options.entity";
// import { AppDataSource } from "../../config/data-source";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedOptions = void 0;
const data_source_1 = require("../../../config/data-source");
const options_entity_1 = require("../../../module/options/options.entity");
const seedOptions = async () => {
    try {
        const repo = data_source_1.AppDataSource.getRepository(options_entity_1.OptionsEntity);
        const options = [
            {
                key: "site_title",
                type: "string",
                value: "Mi Sitio Web",
            },
            {
                key: "maintenance_mode",
                type: "boolean",
                value: "false",
            },
            {
                key: "support_email",
                type: "string",
                value: "soporte@example.com",
            },
        ];
        for (const opt of options) {
            const existing = await repo.findOneBy({ key: opt.key });
            if (!existing) {
                await repo.save(repo.create(opt));
                console.log(`✔️ Inserted: ${opt.key}`);
            }
            else {
                console.log(`⚠️ Already exists: ${opt.key}`);
            }
        }
        console.log("✅ Seed complete");
    }
    catch (error) {
        console.error("❌ Seed failed", error);
        process.exit(1);
    }
};
exports.seedOptions = seedOptions;
//# sourceMappingURL=options.seeder.js.map