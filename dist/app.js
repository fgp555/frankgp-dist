"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const asyncHandler_1 = require("./utils/asyncHandler");
const visit_middleware_1 = require("./middleware/visit.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const shortener_controller_1 = require("./module/shortener/shortener.controller");
const auth_routes_1 = __importDefault(require("./module/auth/auth.routes"));
const seed_routes_1 = __importDefault(require("./seed/seed.routes"));
const shortener_routes_1 = __importDefault(require("./module/shortener/shortener.routes"));
const user_routes_1 = __importDefault(require("./module/user/user.routes"));
const visit_routes_1 = __importDefault(require("./module/visit/visit.routes"));
const options_routes_1 = __importDefault(require("./module/options/options.routes"));
const database_routes_1 = __importDefault(require("./module/database/database.routes"));
const project_routes_1 = __importDefault(require("./module/project/project.routes"));
const info_routes_1 = __importDefault(require("./module/info/info.routes"));
const whatsapp_routes_1 = __importDefault(require("./module/whatsapp/whatsapp.routes"));
const body_parser_1 = __importDefault(require("body-parser")); // 👈 Asegúrate de importar esto
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
// ⚠️ Agrega este middleware personalizado antes de express.json()
// Esto es solo para la ruta del webhook
app.use("/api/whatsapp/webhook", body_parser_1.default.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString("utf8");
    }
}));
app.use(express_1.default.json());
app.use(visit_middleware_1.countVisitMiddleware);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/seed", seed_routes_1.default);
app.use("/api/shortener", shortener_routes_1.default);
app.use("/api/visits", visit_routes_1.default);
app.use("/api/options", options_routes_1.default);
app.use("/api/db", database_routes_1.default);
app.use("/api/projects", project_routes_1.default);
app.use("/api/info", info_routes_1.default);
app.use("/api/whatsapp", whatsapp_routes_1.default);
app.get("/:code", (0, asyncHandler_1.asyncHandler)(new shortener_controller_1.ShortenerController().redirect)); // para redirección pública
// Static files from React
const clientBuildPath = path_1.default.join(__dirname, "../../frankgp-dist/frontend");
app.use(express_1.default.static(clientBuildPath));
// Catch-all to support client-side routing
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(clientBuildPath, "index.html"));
});
// ✅ Error middleware al final
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map