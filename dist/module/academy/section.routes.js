"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const section_controller_1 = require("./section.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new section_controller_1.SectionController();
router.post("/create", (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.get("/findAll", (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/findOne/:id", (0, asyncHandler_1.asyncHandler)(controller.findOne.bind(controller)));
router.get("/findByCourse/:courseId", (0, asyncHandler_1.asyncHandler)(controller.findByCourse.bind(controller)));
router.patch("/update/:id", (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/remove/:id", (0, asyncHandler_1.asyncHandler)(controller.remove.bind(controller)));
exports.default = router;
//# sourceMappingURL=section.routes.js.map