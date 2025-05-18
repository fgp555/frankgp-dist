"use strict";
// src/seeder.ts
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const user_seeder_1 = require("./module/user/user.seeder");
data_source_1.AppDataSource.initialize()
    .then(async () => {
    console.log("📦 Database initialized for seeding...");
    await (0, user_seeder_1.seedUser)();
    console.log("🌱 Seeding done.");
    process.exit(0);
})
    .catch((err) => {
    console.error("❌ Error initializing database for seeding", err);
    process.exit(1);
});
//# sourceMappingURL=seeder.js.map