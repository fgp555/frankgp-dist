"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shortener_controller_1 = require("./shortener.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new shortener_controller_1.ShortenerController();
router.post("/", (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.get("/", (0, asyncHandler_1.asyncHandler)(controller.getAll.bind(controller)));
router.get("/:code", (0, asyncHandler_1.asyncHandler)(controller.redirect.bind(controller)));
router.patch("/:id", (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
exports.default = router;
//# sourceMappingURL=shortener.routes.js.map