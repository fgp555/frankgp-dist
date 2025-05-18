"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.routes.ts
const express_1 = require("express");
const project_routes_1 = __importDefault(require("./project.routes"));
const project_user_routes_1 = __importDefault(require("./project-user.routes"));
const router = (0, express_1.Router)();
router.use("/", project_routes_1.default);
router.use("/user", project_user_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.routes.js.map