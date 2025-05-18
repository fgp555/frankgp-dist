"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.routes.ts
const express_1 = require("express");
const shortener_routes_1 = __importDefault(require("./shortener.routes"));
const shortener_visit_routes_1 = __importDefault(require("./shortener-visit.routes"));
const router = (0, express_1.Router)();
router.use("/", shortener_routes_1.default);
router.use("/visit", shortener_visit_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.routes.js.map