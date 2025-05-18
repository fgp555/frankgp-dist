"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/module/oauth/oauth-user.routes.ts
const express_1 = require("express");
const oauth_user_controller_1 = require("./oauth-user.controller");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new oauth_user_controller_1.OAuthUserController();
router.get("/", (0, asyncHandler_1.asyncHandler)(controller.findAll));
router.get("/:id", (0, asyncHandler_1.asyncHandler)(controller.findById));
router.delete("/:id", (0, asyncHandler_1.asyncHandler)(controller.remove));
exports.default = router;
//# sourceMappingURL=oauth-user.routes.js.map