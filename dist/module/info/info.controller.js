"use strict";
// src/module/info/info.controller.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoController = void 0;
const data_source_1 = require("../../config/data-source");
const options_entity_1 = require("../options/options.entity");
const os_1 = __importDefault(require("os"));
require("dotenv/config");
const visit_middleware_1 = require("../../middleware/visit.middleware");
class InfoController {
    async info(req, res) {
        const { count, date, time } = await getBootInfo();
        const visitCount = visit_middleware_1.visitDataMock.length;
        const info = {
            "Visit Count": visitCount,
            "Boot Count": count,
            "Last Boot Date": date,
            "Last Boot Time": time,
            "Server Time": new Date().toLocaleString(),
            "Node.js Version": process.version,
            "Operating System": os_1.default.platform(),
            "OS Architecture": os_1.default.arch(),
            "CPU Cores": os_1.default.cpus().length,
            "Free Memory": (os_1.default.freemem() / 1024 ** 3).toFixed(2) + " GB",
            "Total Memory": (os_1.default.totalmem() / 1024 ** 3).toFixed(2) + " GB",
            "Host Name": os_1.default.hostname(),
            Uptime: formatUptime(os_1.default.uptime()),
            "Environment Variables": {
                PORT: process.env.PORT,
                SEED_DATA: process.env.SEED_DATA,
                DROPSCHEMA: process.env.DROPSCHEMA,
                DEV_MODE: process.env.DEV_MODE,
                DB_HOST: process.env.DB_HOST,
                DB_PORT: process.env.DB_PORT,
                DB_TYPE: process.env.DB_TYPE,
                DB_NAME: process.env.DB_NAME,
                DB_USERNAME: process.env.DB_USERNAME,
            },
        };
        res.json(info);
    }
}
exports.InfoController = InfoController;
async function getBootInfo() {
    const repo = data_source_1.AppDataSource.getRepository(options_entity_1.OptionsEntity);
    const countOpt = await repo.findOneBy({ key: "boot_counter" });
    const dateOpt = await repo.findOneBy({ key: "boot_counter_date" });
    const timeOpt = await repo.findOneBy({ key: "boot_last_time" });
    return {
        count: countOpt ? parseInt(countOpt.value, 10) : 0,
        date: dateOpt?.value || "N/A",
        time: timeOpt?.value || "N/A",
    };
}
function formatUptime(seconds) {
    const days = Math.floor(seconds / (24 * 3600));
    seconds %= 24 * 3600;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
//# sourceMappingURL=info.controller.js.map