"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lesson_controller_1 = require("./lesson.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new lesson_controller_1.LessonController();
router.post("/create", (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.get("/findAll", (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/findOne/:id", (0, asyncHandler_1.asyncHandler)(controller.findOne.bind(controller)));
router.get("/findSlug/:slug", (0, asyncHandler_1.asyncHandler)(controller.findSlug.bind(controller)));
router.get("/findBySection/:sectionId", (0, asyncHandler_1.asyncHandler)(controller.findBySection.bind(controller)));
router.patch("/update/:id", (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/remove/:id", (0, asyncHandler_1.asyncHandler)(controller.remove.bind(controller)));
exports.default = router;
//# sourceMappingURL=lesson.routes.js.map