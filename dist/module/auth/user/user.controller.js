"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_service_1 = require("./user.service");
const error_middleware_1 = require("../../../middleware/error.middleware");
const service = new user_service_1.UsersService();
class UsersController {
    async findAll(req, res, next) {
        try {
            const users = await service.findAll();
            res.json(users);
        }
        catch (err) {
            next(err);
        }
    }
    async findOne(req, res, next) {
        try {
            const user = await service.findOne(req.params.id);
            if (!user)
                throw new error_middleware_1.AppError("User not found", 404);
            res.json(user);
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            const user = await service.create(req.body);
            res.status(201).json(user);
        }
        catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            const user = await service.update(req.params.id, req.body);
            if (!user)
                throw new error_middleware_1.AppError("User not found", 404);
            res.json(user);
        }
        catch (err) {
            next(err);
        }
    }
    async remove(req, res, next) {
        try {
            const success = await service.remove(req.params.id);
            if (!success)
                throw new error_middleware_1.AppError("User not found", 404);
            res.json({ message: "User deleted" });
        }
        catch (err) {
            next(err);
        }
    }
    adminOnly(req, res) {
        res.json({ message: "Access granted to superadmin" });
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=user.controller.js.map