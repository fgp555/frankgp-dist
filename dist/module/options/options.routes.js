"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const options_controller_1 = require("./options.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new options_controller_1.OptionsController();
const adminOnly = ["admin", "superadmin"];
router.post("/create", (0, auth_middleware_1.requireRole)(adminOnly), (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.get("/findAll", (0, auth_middleware_1.requireRole)(adminOnly), (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/findOne/:id", (0, asyncHandler_1.asyncHandler)(controller.findOne.bind(controller)));
router.get("/findByKey/:key", (0, asyncHandler_1.asyncHandler)(controller.findByKey.bind(controller)));
router.patch("/update/:id", (0, auth_middleware_1.requireRole)(adminOnly), (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/remove/:id", (0, auth_middleware_1.requireRole)(adminOnly), (0, asyncHandler_1.asyncHandler)(controller.remove.bind(controller)));
router.get("/getBootCount", (0, asyncHandler_1.asyncHandler)(controller.getBootCount.bind(controller)));
exports.default = router;
//# sourceMappingURL=options.routes.js.map