"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsController = void 0;
const options_service_1 = require("./options.service");
class OptionsController {
    constructor() {
        this.service = new options_service_1.OptionsService();
    }
    async create(req, res) {
        const option = await this.service.create(req.body);
        res.json(option);
    }
    async findAll(_req, res) {
        const options = await this.service.findAll();
        res.json(options);
    }
    async findOne(req, res) {
        const option = await this.service.findOne(Number(req.params.id));
        res.json(option);
    }
    async findByKey(req, res) {
        const option = await this.service.findByKey(req.params.key);
        res.json(option);
    }
    async update(req, res) {
        const updated = await this.service.update(Number(req.params.id), req.body);
        res.json(updated);
    }
    async remove(req, res) {
        await this.service.remove(Number(req.params.id));
        res.json({ message: "Deleted successfully" });
    }
    async getBootCount(req, res) {
        const bootCount = await this.service.getBootCount();
        res.json({
            "Server Time": new Date().toLocaleString(),
            "Boot Count": bootCount,
        });
    }
}
exports.OptionsController = OptionsController;
//# sourceMappingURL=options.controller.js.map