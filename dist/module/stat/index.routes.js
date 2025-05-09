"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stat_routes_1 = __importDefault(require("./stat.routes"));
const stat_analytics_routes_1 = __importDefault(require("./stat.analytics.routes"));
const router = (0, express_1.Router)();
// Ruta base: /api/stat
router.use("/", stat_routes_1.default);
// Ruta base: /api/stat/analytics
router.use("/analytics", stat_analytics_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.routes.js.map