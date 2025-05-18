"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConfigService = void 0;
const user_seeder_1 = require("../../seed/module/user/user.seeder");
const options_seeder_1 = require("../../seed/module/options/options.seeder");
const project_seed_1 = require("../../seed/module/project/project.seed");
const project_user_seed_1 = require("../../seed/module/project/project-user.seed");
const shortener_seeder_1 = require("../../seed/module/shortener/shortener.seeder");
const product_seed_1 = require("../../seed/module/product/product.seed");
const data_source_1 = require("../../config/data-source");
class DBConfigService {
    async dropAndSync() {
        const connection = data_source_1.AppDataSource;
        if (!connection.isInitialized) {
            await connection.initialize();
        }
        console.log("🧨 Dropping schema...");
        await connection.dropDatabase();
        console.log("🔁 Synchronizing schema...");
        await connection.synchronize();
        return { message: "Schema dropped and synchronized successfully" };
    }
    async runSeeders() {
        const connection = data_source_1.AppDataSource;
        if (!connection.isInitialized) {
            await connection.initialize();
        }
        await (0, user_seeder_1.seedUser)();
        await (0, options_seeder_1.seedOptions)();
        await (0, project_user_seed_1.projectUserSeeder)();
        await (0, project_seed_1.projectSeeder)();
        await (0, shortener_seeder_1.shortenerSeeder)();
        await (0, product_seed_1.productSeeder)();
        return { message: "Seeders executed successfully" };
    }
    async dropAndSeed() {
        await this.dropAndSync();
        await this.runSeeders();
    }
}
exports.DBConfigService = DBConfigService;
//# sourceMappingURL=db-config.service.js.map