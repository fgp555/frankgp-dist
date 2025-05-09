"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenerController = void 0;
const shortener_service_1 = require("./shortener.service");
const error_middleware_1 = require("../../middleware/error.middleware");
const service = new shortener_service_1.ShortenerService();
class ShortenerController {
    async findAll(req, res, next) {
        try {
            const urls = await service.findAll();
            res.json(urls);
        }
        catch (err) {
            next(err);
        }
    }
    async findAllFilter(req, res, next) {
        try {
            const { page, limit, search, dateVisitFrom, dateVisitTo, sortVisitCount } = req.query;
            const result = await service.findAllFilter({
                page: Number(page),
                limit: Number(limit),
                search: search,
                dateVisitFrom: dateVisitFrom,
                dateVisitTo: dateVisitTo,
                sortVisitCount: sortVisitCount,
            });
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            const { originalUrl, customCode } = req.body;
            const result = await service.create(originalUrl, customCode);
            res.status(201).json(result);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message || "Internal Error", 400));
        }
    }
    async redirect(req, res, next) {
        try {
            const { code } = req.params;
            const record = await service.findByCode(code);
            if (!record)
                return next(); // Si no existe, continúa a React u otro middleware
            // 👁️ Obtener datos del request
            const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress);
            const userAgent = req.headers["user-agent"] || "";
            const referrer = req.headers["referer"] || "";
            // Registrar la visita
            await service.registerVisit(record.id, { ip, userAgent, referrer });
            res.redirect(record.originalUrl);
        }
        catch (err) {
            next(err);
        }
    }
    async findOne(req, res, next) {
        try {
            const id = Number(req.params.id);
            const result = await service.findOne(id);
            if (!result)
                throw new error_middleware_1.AppError("Short URL not found", 404);
            res.json(result);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
    async remove(req, res, next) {
        try {
            const id = Number(req.params.id);
            const deleted = await service.remove(id);
            if (!deleted)
                throw new error_middleware_1.AppError("Short URL not found", 404);
            res.json({ message: "Short URL deleted" });
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
    async update(req, res, next) {
        try {
            const id = Number(req.params.id);
            const { originalUrl, customCode } = req.body;
            const result = await service.update(id, { originalUrl, customCode });
            if (!result)
                throw new error_middleware_1.AppError("Short URL not found", 404);
            res.json(result);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
}
exports.ShortenerController = ShortenerController;
//# sourceMappingURL=shortener.controller.js.map