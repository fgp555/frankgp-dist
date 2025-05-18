"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectUserController = void 0;
const error_middleware_1 = require("../../middleware/error.middleware");
const project_user_service_1 = require("./project-user.service");
const service = new project_user_service_1.ProjectUserService();
class ProjectUserController {
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
    async findUsername(req, res, next) {
        try {
            const username = req.params.username;
            const result = await service.findUsername(username);
            if (!result)
                throw new error_middleware_1.AppError("Project not found", 404);
            res.json(result);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
    async create(req, res, next) {
        try {
            const result = await service.create(req.body);
            res.status(201).json(result);
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
exports.ProjectUserController = ProjectUserController;
//# sourceMappingURL=project-user.controller.js.map