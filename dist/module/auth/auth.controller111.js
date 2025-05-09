"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const error_middleware_1 = require("../../middleware/error.middleware");
const service = new auth_service_1.AuthService();
class AuthController {
    // async register(req: Request, res: Response, next: NextFunction) {
    //   try {
    //     const { email, password } = req.body;
    //     const user = await service.register(email, password);
    //     res.status(201).json({ id: user.id, email: user.email });
    //   } catch (err: any) {
    //     next(new AppError(err.message, 400));
    //   }
    // }
    async login(req, res, next) {
        try {
            const token = await service.login(req.body);
            if (!token)
                throw new error_middleware_1.AppError("Invalid credentials", 401);
            res.json({ token });
        }
        catch (err) {
            next(err);
        }
    }
    async decodeToken(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new error_middleware_1.AppError("Authorization token missing or malformed", 401);
            }
            const token = authHeader.split(" ")[1];
            const decoded = service.decodeToken(token);
            if (!decoded) {
                throw new error_middleware_1.AppError("Invalid or expired token", 401);
            }
            res.json({ decoded });
        }
        catch (error) {
            next(error);
        }
    }
    async refreshToken(req, res, next) {
        // console.log("refreshToken");
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new error_middleware_1.AppError("Authorization token missing or malformed", 401);
            }
            const token = authHeader.split(" ")[1];
            const payload = service.verifyRefreshToken(token);
            // console.log("payload", payload);
            if (!payload) {
                throw new error_middleware_1.AppError("Invalid or expired refresh token", 401);
            }
            const tokens = service.generateTokens({ email: payload.email });
            res.json(tokens);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller111.js.map