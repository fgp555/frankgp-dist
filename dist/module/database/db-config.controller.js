"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConfigController = void 0;
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
        const result = await this.service.runSeeders();
        res.json(result);
    }
    async dropAndSeed(req, res) {
        const result = await this.service.dropAndSeed();
        res.json(result);
    }
}
exports.DBConfigController = DBConfigController;
//# sourceMappingURL=db-config.controller.js.map