"use strict";
// src/main.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./module/database/database.cron");
const data_source_1 = require("./config/data-source");
const countBoot_1 = require("./utils/countBoot");
const envs_1 = require("./config/envs");
const project_seed_1 = require("./seed/module/project/project.seed");
const project_user_seed_1 = require("./seed/module/project/project-user.seed");
const options_seeder_1 = require("./seed/module/options/options.seeder");
const shortener_seeder_1 = require("./seed/module/shortener/shortener.seeder");
const app_1 = __importDefault(require("./app"));
const product_seed_1 = require("./seed/module/product/product.seed");
data_source_1.AppDataSource.initialize()
    .then(async () => {
    console.log("📦 Data source initialized");
    await (0, countBoot_1.countBoot)(); // 👈 contar cada vez que se inicie el servidor
    if (process.env.SEED_DATA === "true") {
        // 🌱 Ejecutar seeders ✅
        // await seedUser();
        await (0, options_seeder_1.seedOptions)();
        await (0, project_user_seed_1.projectUserSeeder)();
        await (0, project_seed_1.projectSeeder)();
        await (0, shortener_seeder_1.shortenerSeeder)();
        await (0, product_seed_1.productSeeder)();
        // await ShortenerSeedSQL();
    }
    app_1.default.listen(envs_1.PORT, () => {
        console.log(`🚀 Server running on port ${envs_1.PORT} 🚀`);
    });
})
    .catch((err) => {
    console.error("❌ Error during data source initialization", err);
});
//# sourceMappingURL=main.js.map