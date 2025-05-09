"use strict";
// src/module/info/info.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const info_controller_1 = require("./info.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new info_controller_1.InfoController();
router.get("/", (0, asyncHandler_1.asyncHandler)(controller.info.bind(controller)));
exports.default = router;
//# sourceMappingURL=info.routes.js.map