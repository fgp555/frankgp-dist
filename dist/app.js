"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser")); // 👈 Asegúrate de importar esto
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const asyncHandler_1 = require("./utils/asyncHandler");
const visit_middleware_1 = require("./middleware/visit.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const seed_routes_1 = __importDefault(require("./seed/seed.routes"));
require("./module/auth/google/passport.config"); // 👈 importa estrategia
const shortener_controller_1 = require("./module/shortener/shortener.controller");
const database_routes_1 = __importDefault(require("./module/database/database.routes"));
const email_routes_1 = __importDefault(require("./module/mail/email.routes"));
const info_routes_1 = __importDefault(require("./module/info/info.routes"));
const options_routes_1 = __importDefault(require("./module/options/options.routes"));
const index_routes_1 = __importDefault(require("./module/project/index.routes"));
const index_routes_2 = __importDefault(require("./module/shortener/index.routes"));
const index_routes_3 = __importDefault(require("./module/stat/index.routes"));
const user_routes_1 = __importDefault(require("./module/auth/user/user.routes"));
const visit_routes_1 = __importDefault(require("./module/visit/visit.routes"));
const whatsapp_routes_1 = __importDefault(require("./module/whatsapp/whatsapp.routes"));
const index_routes_4 = __importDefault(require("./module/auth/index.routes"));
const product_routes_1 = __importDefault(require("./module/store/product/product.routes"));
const academy_index_routes_1 = __importDefault(require("./module/academy/academy.index.routes"));
const setupFrontendFallback_1 = require("./utils/setupFrontendFallback");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
// ⚠️ Agrega este middleware personalizado antes de express.json()
// Esto es solo para la ruta del webhook
app.use("/api/whatsapp/webhook", body_parser_1.default.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString("utf8");
    },
}));
// 👇 Configurar sesiones
app.use((0, express_session_1.default)({
    secret: "mi_secreto",
    resave: false,
    saveUninitialized: false,
}));
app.use(express_1.default.json());
app.use(visit_middleware_1.countVisitMiddleware);
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// app.use("/api/oauth-users", oauthRoutes);
// app.use("/api/auth", googleRoutes);
app.use("/api/auth", index_routes_4.default);
app.use("/api/db", database_routes_1.default);
app.use("/api/email", email_routes_1.default);
app.use("/api/info", info_routes_1.default);
app.use("/api/options", options_routes_1.default);
app.use("/api/projects", index_routes_1.default);
app.use("/api/seed", seed_routes_1.default);
app.use("/api/shortener", index_routes_2.default);
app.use("/api/stat", index_routes_3.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/visits", visit_routes_1.default);
app.use("/api/whatsapp", whatsapp_routes_1.default);
app.use("/api/product", product_routes_1.default);
app.use("/api/academy", academy_index_routes_1.default);
app.get("/:code", (0, asyncHandler_1.asyncHandler)(new shortener_controller_1.ShortenerController().redirect)); // para redirección pública
const clientBuildPath = path_1.default.join(__dirname, "../../frankgp-dist/frontend");
(0, setupFrontendFallback_1.setupFrontendFallback)(app, clientBuildPath);
// ✅ Error middleware al final
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map