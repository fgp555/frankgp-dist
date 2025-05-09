"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const router = (0, express_1.Router)();
// const controllerSeed = new UserSeedController();
const controller = new user_controller_1.UsersController();
// const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };
// router.get("/seed", asyncHandler(controllerSeed.seed.bind(controllerSeed)));
router.get("/", (0, asyncHandler_1.asyncHandler)(controller.getAll.bind(controller)));
router.get("/:id", (0, asyncHandler_1.asyncHandler)(controller.getOne.bind(controller)));
router.post("/", (0, asyncHandler_1.asyncHandler)(controller.create.bind(controller)));
router.patch("/:id", (0, asyncHandler_1.asyncHandler)(controller.update.bind(controller)));
router.delete("/:id", (0, asyncHandler_1.asyncHandler)(controller.delete.bind(controller)));
// router.get("/", (req, res, next) => controller.getAll(req, res, next));
// router.get("/:id", (req, res, next) => controller.getOne(req, res, next));
// router.post("/", (req, res, next) => controller.create(req, res, next));
// router.put("/:id", (req, res, next) => controller.update(req, res, next));
// router.delete("/:id", (req, res, next) => controller.delete(req, res, next));
exports.default = router;
//# sourceMappingURL=user.routes.js.map