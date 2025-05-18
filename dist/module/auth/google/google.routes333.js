"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const oauth_user_service_1 = require("../oauth/oauth-user.service");
const data_source_1 = require("../../../config/data-source");
const user_entity_1 = require("../../user/dtos-entities/user.entity");
const router = (0, express_1.Router)();
const oauthService = new oauth_user_service_1.OAuthUserService();
const JWT_SECRET = process.env.JWT_SECRET || "mi_super_secreto";
const JWT_EXPIRES_IN = "1d";
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", { session: false, failureRedirect: "/login" }), async (req, res) => {
    try {
        const profile = req.user;
        const email = profile.emails?.[0]?.value || "";
        const userRepo = data_source_1.AppDataSource.getRepository(user_entity_1.UserEntity);
        const findUser = await userRepo.findOneBy({ email });
        if (!findUser) {
            const userCreate = userRepo.create({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails?.[0]?.value || "",
                photo: profile.photos?.[0]?.value,
            });
            const userSave = await userRepo.save(userCreate);
            const payload = {
                sub: userSave.id,
                email: userSave.email,
                name: userSave.displayName,
                picture: userSave.photo,
                test: "test userSave",
            };
            const jwtToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${jwtToken}`);
            return;
        }
        else {
            const payload = {
                sub: findUser.id,
                email: findUser.email,
                name: findUser.displayName,
                picture: findUser.photo,
                test: "test findUser",
            };
            const jwtToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${jwtToken}`);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al procesar el usuario de Google", error });
    }
});
exports.default = router;
//# sourceMappingURL=google.routes333.js.map