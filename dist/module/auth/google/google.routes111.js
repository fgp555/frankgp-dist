"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const oauth_user_service_1 = require("../oauth/oauth-user.service");
const router = (0, express_1.Router)();
const oauthService = new oauth_user_service_1.OAuthUserService();
const JWT_SECRET = process.env.JWT_SECRET || "mi_super_secreto";
const JWT_EXPIRES_IN = "1d";
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", { session: false, failureRedirect: "/login" }), async (req, res) => {
    try {
        const profile = req.user;
        const user = await oauthService.findOrCreate({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value || "",
            photo: profile.photos?.[0]?.value,
        });
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.displayName,
            picture: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        };
        const jwtToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${jwtToken}`);
        // res.json({ token: jwtToken });
    }
    catch (error) {
        res.status(500).json({ message: "Error al procesar el usuario de Google", error });
    }
});
exports.default = router;
//# sourceMappingURL=google.routes111.js.map