"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shortener_controller_1 = require("./shortener.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const router = (0, express_1.Router)();
const controller = new shortener_controller_1.ShortenerController();
router.post("/create", (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.get("/findAll", (0, asyncHandler_1.asyncHandler)(controller.findAll.bind(controller)));
router.get("/findAllFilter", (0, asyncHandler_1.asyncHandler)(controller.findAllFilter.bind(controller)));
router.get("/redirect/:code", (0, asyncHandler_1.asyncHandler)(controller.redirect.bind(controller)));
router.patch("/update/:id", (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.get("/findOne/:id", (0, asyncHandler_1.asyncHandler)(controller.findOne.bind(controller)));
router.delete("/remove/:id", (0, asyncHandler_1.asyncHandler)(controller.remove.bind(controller)));
exports.default = router;
//# sourceMappingURL=shortener.routes.js.map