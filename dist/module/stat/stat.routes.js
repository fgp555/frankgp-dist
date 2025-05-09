"use strict";
// src/module/stat/stat.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stat_controller_1 = require("./stat.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new stat_controller_1.StatController();
router.post("/track", (0, asyncHandler_1.asyncHandler)(controller.track.bind(controller)));
router.get("/findAll", (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/ipapi_co_json", (0, asyncHandler_1.asyncHandler)(controller.ipapi_co_json.bind(controller)));
router.get("/findOne/:id", (0, asyncHandler_1.asyncHandler)(controller.findOne.bind(controller)));
router.delete("/remove/:id", (0, asyncHandler_1.asyncHandler)(controller.remove.bind(controller)));
exports.default = router;
//# sourceMappingURL=stat.routes.js.map