"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
// src/module/auth/auth.service.ts
const data_source_1 = require("../../config/data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_entity_1 = require("../user/dtos-entities/user.entity");
const roles_enum_1 = require("../user/enum/roles.enum");
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-secret";
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || "secret123";
class AuthService {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || "secret123";
        this.repo = data_source_1.AppDataSource.getRepository(user_entity_1.UserEntity);
    }
    async register(email, password) {
        const existing = await this.repo.findOneBy({ email });
        if (existing)
            throw new Error("Email already registered");
        const hashed = await bcrypt_1.default.hash(password, 10);
        const user = this.repo.create({ email, password: hashed });
        return await this.repo.save(user);
    }
    async login(body) {
        const { email } = body;
        const findEmail = await this.repo.findOneBy({ email });
        if (!findEmail)
            return null;
        const isPasswordValid = await bcrypt_1.default.compare(body.password, findEmail.password);
        if (!isPasswordValid)
            return null;
        const { password, ...user } = findEmail;
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
        const token = jsonwebtoken_1.default.sign(userPayload, this.jwtSecret, { expiresIn: "7d" }); // o '7d', '15m', etc.
        // const tokenService = new TokenService();
        // const { accessToken: token, refreshToken } = tokenService.generateTokens(userPayload);
        const decoded = jsonwebtoken_1.default.decode(token);
        const loginDate = new Date().toLocaleString();
        const expirationDate = new Date(decoded.exp * 1000).toLocaleString();
        return { login: true, user, token: token, loginDate, expirationDate };
    }
    async verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, this.jwtSecret);
    }
    async decodeToken(token) {
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded)
            return null;
        const expirationDate = decoded.exp ? new Date(decoded.exp * 1000).toLocaleString() : null;
        const createdDate = decoded.iat ? new Date(decoded.iat * 1000).toLocaleString() : null;
        const currentDate = new Date().toLocaleString();
        const verify = jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
        return {
            ...decoded,
            createdDate,
            expirationDate,
            currentDate,
            verify,
        };
    }
    async generateTokens(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
        const refreshToken = jsonwebtoken_1.default.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
        return { accessToken, refreshToken };
    }
    async verifyRefreshToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
            // console.log("verify 2", verify);
            // return verify;
        }
        catch {
            return null;
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service111.js.map