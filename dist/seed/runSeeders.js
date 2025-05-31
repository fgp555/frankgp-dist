"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeeders = void 0;
const data_source_1 = require("../config/data-source");
const categories_seed_1 = require("./module/academy/categories.seed");
const sections_seed_1 = require("./module/academy/sections.seed");
const options_seeder_1 = require("./module/options/options.seeder");
const product_seed_1 = require("./module/product/product.seed");
const project_user_seed_1 = require("./module/project/project-user.seed");
const project_seed_1 = require("./module/project/project.seed");
const shortener_seeder_1 = require("./module/shortener/shortener.seeder");
const user_seeder_1 = require("./module/user/user.seeder");
const runSeeders = async () => {
    const connection = data_source_1.AppDataSource;
    if (!connection.isInitialized) {
        await connection.initialize();
    }
    // 🌱 Ejecutar seeders ✅
    await (0, user_seeder_1.seedUser)();
    await (0, options_seeder_1.seedOptions)();
    await (0, shortener_seeder_1.seedShortener)();
    await (0, project_user_seed_1.seedProjectUser)();
    await (0, project_seed_1.seedProject)();
    await (0, product_seed_1.seedProduct)();
    await (0, categories_seed_1.seedAcademyCategory)();
    await (0, sections_seed_1.seedAcademySection)();
    return { message: "Seeders executed successfully" };
};
exports.runSeeders = runSeeders;
//# sourceMappingURL=runSeeders.js.map