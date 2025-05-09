"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const data_source_1 = require("../../config/data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_entity_1 = require("../user/dtos-entities/user.entity");
const roles_enum_1 = require("../user/enum/roles.enum");
const ACCESS_SECRET_EXPIRES = "3d";
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-secret";
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh-secret";
class AuthService {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(user_entity_1.UserEntity);
    }
    async register(body) {
        const existing = await this.repo.findOneBy({ email: body.email });
        if (existing)
            throw new Error("Email already registered");
        const hashed = await bcrypt_1.default.hash(body.password, 10);
        const user = this.repo.create({ ...body, password: hashed });
        return await this.repo.save(user);
    }
    async login(body) {
        const { email, password } = body;
        const findEmail = await this.repo.findOneBy({ email });
        if (!findEmail)
            return null;
        const isPasswordValid = await bcrypt_1.default.compare(password, findEmail.password);
        if (!isPasswordValid)
            return null;
        const { password: _, ...user } = findEmail;
        const userRoles = findEmail.role === "superadmin"
            ? [roles_enum_1.RolesEnum.SuperAdmin]
            : findEmail.role === "admin"
                ? [roles_enum_1.RolesEnum.Admin]
                : findEmail.role === "collaborator"
                    ? [roles_enum_1.RolesEnum.Collaborator]
                    : [roles_enum_1.RolesEnum.User];
        const userPayload = {
            sub: findEmail.id,
            userId: findEmail.id,
            email: findEmail.email,
            roles: userRoles,
        };
        const tokens = this.generateTokens(userPayload);
        const decodedAccess = jsonwebtoken_1.default.decode(tokens.accessToken);
        const loginDate = new Date().toLocaleString();
        const expirationDate = decodedAccess?.exp ? new Date(decodedAccess.exp * 1000).toLocaleString() : null;
        return {
            login: true,
            user: {
                ...user,
                devices: [],
                operator: {
                    name: "COPETRAN",
                },
            },
            loginDate,
            expirationDate,
            currentDate: new Date().toLocaleString(),
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
    decodeToken(token) {
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded)
            return null;
        const createdDate = decoded.iat ? new Date(decoded.iat * 1000) : null;
        const expirationDate = decoded.exp ? new Date(decoded.exp * 1000) : null;
        const currentDate = new Date();
        let status = "unknown";
        if (expirationDate) {
            status = expirationDate > currentDate ? "active" : "expired";
        }
        return {
            ...decoded,
            status,
            tokenType: decoded.tokenType || "unknown",
            createdDate: createdDate?.toLocaleString() || null,
            expirationDate: expirationDate?.toLocaleString() || null,
            currentDate: currentDate.toLocaleString(),
        };
    }
    generateTokens(payload) {
        const accessPayload = { ...payload, tokenType: "access" };
        const refreshPayload = { ...payload, tokenType: "refresh" };
        const accessToken = jsonwebtoken_1.default.sign(accessPayload, ACCESS_SECRET, { expiresIn: ACCESS_SECRET_EXPIRES });
        const refreshToken = jsonwebtoken_1.default.sign(refreshPayload, REFRESH_SECRET, { expiresIn: "7d" });
        return { accessToken, refreshToken };
    }
    verifyRefreshToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
        }
        catch {
            return null;
        }
    }
    async forgotPassword(email) {
        const user = await this.repo.findOneBy({ email });
        if (!user)
            throw new Error("Email not found");
        const tokenPayload = {
            email: user.email,
            userId: user.id,
            tokenType: "reset",
        };
        const resetToken = jsonwebtoken_1.default.sign(tokenPayload, ACCESS_SECRET, { expiresIn: ACCESS_SECRET_EXPIRES });
        // Aquí podrías enviar el token por correo (ej. con nodemailer)
        return resetToken;
    }
    async restorePassword(resetToken, newPassword) {
        try {
            const decoded = jsonwebtoken_1.default.verify(resetToken, ACCESS_SECRET);
            if (!decoded || decoded.tokenType !== "reset")
                throw new Error("Invalid token");
            const user = await this.repo.findOneBy({ id: decoded.userId });
            if (!user)
                throw new Error("User not found");
            const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
            user.password = hashedPassword;
            await this.repo.save(user);
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map