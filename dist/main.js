"use strict";
// src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const data_source_1 = require("./config/data-source");
const envs_1 = require("./config/envs");
const user_seeder_1 = require("./seed/user/user.seeder");
data_source_1.AppDataSource.initialize()
    .then(async () => {
    console.log("📦 Data source initialized");
    // ✅ Ejecutar seeder
    await (0, user_seeder_1.seedUser)();
    app_1.default.listen(envs_1.PORT, () => console.log(`🚀 Server running on port ${envs_1.PORT}`));
})
    .catch((err) => {
    console.error("❌ Error during data source initialization", err);
});
//# sourceMappingURL=main.js.map