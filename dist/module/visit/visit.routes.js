"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/module/visit/visit.routes.ts
const express_1 = require("express");
const visit_controller_1 = require("./visit.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new visit_controller_1.VisitController();
router.get("/findAll", (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/findAllMock", (0, asyncHandler_1.asyncHandler)(controller.findAllMock.bind(controller)));
exports.default = router;
//# sourceMappingURL=visit.routes.js.map