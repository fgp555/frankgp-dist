"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenerController = void 0;
const shortener_service_1 = require("./shortener.service");
const error_middleware_1 = require("../../middleware/error.middleware");
const service = new shortener_service_1.ShortenerService();
class ShortenerController {
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
            if (!record) {
                // Si no existe, pasa al siguiente middleware (React se encargará)
                return next();
            }
            res.redirect(record.originalUrl);
        }
        catch (err) {
            next(err);
        }
    }
    async findAll(req, res, next) {
        try {
            const urls = await service.findAll();
            res.json(urls);
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