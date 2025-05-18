"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const project_user_controller_1 = require("./project-user.controller");
const router = (0, express_1.Router)();
const controller = new project_user_controller_1.ProjectUserController();
router.get("/findAll", (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/findOne/:id", (0, asyncHandler_1.asyncHandler)(controller.findOne.bind(controller)));
router.get("/findUsername/:username", (0, asyncHandler_1.asyncHandler)(controller.findUsername.bind(controller)));
router.post("/create", (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.delete("/remove/:id", (0, asyncHandler_1.asyncHandler)(controller.remove.bind(controller)));
exports.default = router;
//# sourceMappingURL=project-user.routes.js.map