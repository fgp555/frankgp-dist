"use strict";
// src/module/stat/stat.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatController = void 0;
const stat_service_1 = require("./stat.service");
const error_middleware_1 = require("../../middleware/error.middleware");
const service = new stat_service_1.StatService();
class StatController {
    async track(req, res, next) {
        try {
            const data = req.body;
            const result = await service.track(data);
            res.status(201).json({ status: "ok", data: result });
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message || "Internal Error", 500));
        }
    }
    async findAll(req, res, next) {
        try {
            const result = await service.findAll();
            res.status(200).json(result);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message || "Internal Error", 500));
        }
    }
    async findOne(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id))
                throw new error_middleware_1.AppError("Invalid ID", 400);
            const stat = await service.findOne(id);
            if (!stat)
                throw new error_middleware_1.AppError("Not found", 404);
            res.json(stat);
        }
        catch (err) {
            next(err);
        }
    }
    async remove(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id))
                throw new error_middleware_1.AppError("Invalid ID", 400);
            await service.remove(id);
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    }
    async ipapi_co_json(req, res, next) {
        res.json({
            ip: "2803:a3e0:18c2:6030:2c99:967d:9f53:7f2e",
            network: "2803:a3e0:18c0::/42",
            version: "IPv6",
            city: "Juliaca",
            region: "Puno",
            region_code: "PUN",
            country: "PE",
            country_name: "Peru",
            country_code: "PE",
            country_code_iso3: "PER",
            country_capital: "Lima",
            country_tld: ".pe",
            continent_code: "SA",
            in_eu: false,
            postal: null,
            latitude: -15.4991,
            longitude: -70.1339,
            timezone: "America/Lima",
            utc_offset: "-0500",
            country_calling_code: "+51",
            currency: "PEN",
            currency_name: "Sol",
            languages: "es-PE,qu,ay",
            country_area: 1285220,
            country_population: 31989256,
            asn: "AS270068",
            org: "DESARROLLO DE INFRAESTRUCTURA DE TELECOMUNICACIONES PERU S.A.C. INFRATEL",
        });
    }
}
exports.StatController = StatController;
//# sourceMappingURL=stat.controller.js.map