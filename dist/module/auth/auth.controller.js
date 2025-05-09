"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const error_middleware_1 = require("../../middleware/error.middleware");
const service = new auth_service_1.AuthService();
class AuthController {
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await service.register(req.body);
            res.status(201).json(user);
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
    async login(req, res, next) {
        try {
            const result = await service.login(req.body);
            if (!result)
                throw new error_middleware_1.AppError("Invalid credentials", 401);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    decodeToken(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader)
                throw new error_middleware_1.AppError("Authorization token missing or malformed", 401);
            const token = authHeader.split(" ")[1];
            const decoded = service.decodeToken(token);
            if (!decoded)
                throw new error_middleware_1.AppError("Invalid or expired token", 401);
            res.json({ decoded });
        }
        catch (error) {
            next(error);
        }
    }
    async refreshToken(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader)
                throw new error_middleware_1.AppError("Authorization token missing or malformed", 401);
            const token = authHeader.split(" ")[1];
            const payload = service.verifyRefreshToken(token);
            if (!payload)
                throw new error_middleware_1.AppError("Invalid or expired refresh token", 401);
            const { email, sub, userId, roles } = payload;
            const newTokens = service.generateTokens({ email, sub, userId, roles });
            res.json(newTokens);
        }
        catch (err) {
            next(err);
        }
    }
    async forgotPassword(req, res, next) {
        try {
            const { email } = req.body;
            const token = await service.forgotPassword(email);
            // Por ahora solo devolvemos el token (en producción deberías enviarlo por correo)
            res.json({ resetToken: token });
        }
        catch (err) {
            next(new error_middleware_1.AppError(err.message, 400));
        }
    }
    async restorePassword(req, res, next) {
        try {
            const { resetToken, newPassword } = req.body;
            const success = await service.restorePassword(resetToken, newPassword);
            if (!success)
                throw new error_middleware_1.AppError("Failed to reset password", 400);
            res.json({ message: "Password reset successful" });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map