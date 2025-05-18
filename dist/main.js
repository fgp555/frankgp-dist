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
const runSeeders_1 = require("./seed/runSeeders");
const app_1 = __importDefault(require("./app"));
data_source_1.AppDataSource.initialize()
    .then(async () => {
    console.log("📦 Data source initialized");
    await (0, countBoot_1.countBoot)(); // 👈 contar cada vez que se inicie el servidor
    if (process.env.SEED_DATA === "true") {
        // 🌱 Ejecutar seeders ✅
        await (0, runSeeders_1.runSeeders)();
    }
    app_1.default.listen(envs_1.PORT, () => {
        console.log(`🚀 Server running on port ${envs_1.PORT} 🚀`);
    });
})
    .catch((err) => {
    console.error("❌ Error during data source initialization", err);
});
//# sourceMappingURL=main.js.map