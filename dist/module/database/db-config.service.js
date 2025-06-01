"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConfigService = void 0;
const data_source_1 = require("../../config/data-source");
const runSeeders_1 = require("../../seed/runSeeders");
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
    async dropAndSeed() {
        await this.dropAndSync();
        await (0, runSeeders_1.runSeeders)();
    }
    async runSQLQuery(query) {
        const connection = data_source_1.AppDataSource;
        if (!connection.isInitialized) {
            await connection.initialize();
        }
        try {
            const result = await connection.query(query);
            return { success: true, result };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
}
exports.DBConfigService = DBConfigService;
//# sourceMappingURL=db-config.service.js.map