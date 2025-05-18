"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const oauth_user_service_1 = require("../oauth/oauth-user.service");
const auth_service_1 = require("../auth.service");
const router = (0, express_1.Router)();
const oauthService = new oauth_user_service_1.OAuthUserService();
const authService = new auth_service_1.AuthService();
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
        // ⚡ Usa AuthService para generar tokens y estructura
        const loginResponse = await authService.login({ email: user.email, password: user.googleId });
        if (!loginResponse) {
            return res.redirect("https://your-client.com/login?error=LoginFailed");
        }
        // 🔒 Opcional: codifica todo como JWT
        const dataToken = jsonwebtoken_1.default.sign(loginResponse, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        console.log("dataToken", dataToken);
        // ✅ Redirige al frontend con token codificado
        const redirectUrl = `https://your-client.com/oauth-success?data=${encodeURIComponent(dataToken)}`;
        return res.redirect(redirectUrl);
    }
    catch (err) {
        console.error("Error en Google Callback:", err);
        res.redirect("https://your-client.com/login?error=OAuthFailed");
    }
});
exports.default = router;
//# sourceMappingURL=google.routes222.js.map