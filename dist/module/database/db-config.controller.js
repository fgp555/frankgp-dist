"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConfigController = void 0;
const runSeeders_1 = require("../../seed/runSeeders");
const db_config_service_1 = require("./db-config.service");
class DBConfigController {
    constructor() {
        this.service = new db_config_service_1.DBConfigService();
    }
    async dropAndSync(req, res) {
        const result = await this.service.dropAndSync();
        res.json(result);
    }
    async runSeeders(req, res) {
        const result = await (0, runSeeders_1.runSeeders)();
        res.json(result);
    }
    async dropAndSeed(req, res) {
        const result = await this.service.dropAndSeed();
        res.json(result);
    }
    async runSQLQuery(req, res) {
        const { query } = req.body;
        if (!query || typeof query !== "string") {
            return res.status(400).json({ error: "Query must be a valid string." });
        }
        const result = await this.service.runSQLQuery(query);
        res.json(result);
    }
}
exports.DBConfigController = DBConfigController;
//# sourceMappingURL=db-config.controller.js.map