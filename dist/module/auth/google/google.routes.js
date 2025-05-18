"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("../../../config/data-source");
const user_entity_1 = require("../../auth/user/dtos-entities/user.entity");
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || "mi_super_secreto";
const JWT_EXPIRES_IN = "1d";
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", { session: false, failureRedirect: "/login" }), async (req, res) => {
    try {
        const profileGoogle = req.user;
        const email = profileGoogle.emails?.[0]?.value || "";
        const userRepo = data_source_1.AppDataSource.getRepository(user_entity_1.UserEntity);
        let user = await userRepo.findOneBy({ email });
        if (!user) {
            // 🆕 Crear nuevo usuario si no existe
            user = userRepo.create({
                googleId: profileGoogle.id,
                name: profileGoogle.name.givenName,
                lastName: profileGoogle.name.familyName,
                displayName: profileGoogle.displayName,
                email,
                photo: profileGoogle.photos?.[0]?.value,
                rawGoogle: profileGoogle._raw,
            });
            user = await userRepo.save(user);
        }
        else {
            // 🔁 Actualizar datos del usuario existente si hay cambios
            user.googleId = profileGoogle.id;
            user.name = profileGoogle.name.givenName;
            user.lastName = profileGoogle.name.familyName;
            user.displayName = profileGoogle.displayName;
            user.photo = profileGoogle.photos?.[0]?.value;
            user.rawGoogle = profileGoogle._raw;
            user = await userRepo.save(user);
        }
        const jwtExpiresIn = parseInt(JWT_EXPIRES_IN, 10); // parse as an integer
        // 🎯 Generar token
        const payload = {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                isVisible: user.isVisible,
                photo: user.photo,
            },
            accessToken: jsonwebtoken_1.default.sign({ sub: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }),
            refreshToken: jsonwebtoken_1.default.sign({ sub: user.id }, JWT_SECRET, { expiresIn: "7d" }),
            loginDate: new Date().toLocaleString(),
            expirationDate: new Date(new Date().getTime() + jwtExpiresIn * 1000).toLocaleString(),
            sub: user.id,
        };
        const jwtToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${jwtToken}`);
    }
    catch (error) {
        console.error("OAuth Callback Error:", error);
        res.status(500).json({ message: "Error al procesar el usuario de Google", error });
    }
});
exports.default = router;
//# sourceMappingURL=google.routes.js.map