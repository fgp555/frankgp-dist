"use strict";
// src/module/stat/stat.analytics.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatAnalyticsController = void 0;
const stat_analytics_service_1 = require("./stat.analytics.service");
const error_middleware_1 = require("../../middleware/error.middleware");
const service = new stat_analytics_service_1.StatAnalyticsService();
class StatAnalyticsController {
    async summary(req, res, next) {
        try {
            const result = await service.getSummary();
            res.json(result);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message || "Internal Error", 500));
        }
    }
    async byDate(req, res, next) {
        try {
            const { from, to } = req.query;
            const result = await service.getByDate(from, to);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async byCountry(req, res, next) {
        try {
            const result = await service.getByCountry();
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async byURL(req, res, next) {
        try {
            const { dateFrom, dateTo } = req.query;
            const result = await service.getByURL({
                dateFrom: dateFrom,
                dateTo: dateTo,
            });
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async byAffiliate(req, res, next) {
        try {
            const { source } = req.query;
            const result = await service.getByAffiliate(source);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.StatAnalyticsController = StatAnalyticsController;
//# sourceMappingURL=stat.analytics.controller.js.map