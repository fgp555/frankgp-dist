"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const project_service_1 = require("./project.service");
const error_middleware_1 = require("../../middleware/error.middleware");
const service = new project_service_1.ProjectService();
class ProjectController {
    async create(req, res, next) {
        try {
            const result = await service.create(req.body);
            res.status(201).json(result);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
    async findAll(req, res, next) {
        try {
            const result = await service.findAll();
            res.json(result);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
    async findOne(req, res, next) {
        try {
            const id = Number(req.params.id);
            const result = await service.findOne(id);
            if (!result)
                throw new error_middleware_1.AppError("Project not found", 404);
            res.json(result);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
    async findOneSlug(req, res, next) {
        try {
            const slug = req.params.slug;
            const result = await service.findOneBySlug(slug);
            if (!result)
                throw new error_middleware_1.AppError("Project not found", 404);
            res.json(result);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
    async update(req, res, next) {
        try {
            const id = Number(req.params.id);
            const result = await service.update(id, req.body);
            if (!result)
                throw new error_middleware_1.AppError("Project not found", 404);
            res.json(result);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
    async remove(req, res, next) {
        try {
            const id = Number(req.params.id);
            const result = await service.remove(id);
            if (!result)
                throw new error_middleware_1.AppError("Project not found", 404);
            res.json({ message: "Project deleted" });
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
}
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map