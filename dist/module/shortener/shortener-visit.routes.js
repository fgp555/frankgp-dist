"use strict";
// src/module/shortener/shortener-visit.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shortener_visit_controller_1 = require("./shortener-visit.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new shortener_visit_controller_1.ShortenerVisitController();
router.get("/", (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/:id", (0, asyncHandler_1.asyncHandler)(controller.findByShortenerId.bind(controller)));
exports.default = router;
//# sourceMappingURL=shortener-visit.routes.js.map