"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../utils/asyncHandler");
const seed_controller_1 = require("./seed.controller");
const router = (0, express_1.Router)();
const controller = new seed_controller_1.SeedController();
router.get("/user", (0, asyncHandler_1.asyncHandler)(controller.seedUser.bind(controller)));
exports.default = router;
//# sourceMappingURL=seed.routes.js.map