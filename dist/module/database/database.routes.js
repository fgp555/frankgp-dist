"use strict";
// src/module/database/database.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const db_backup_controller_1 = require("./db-backup.controller");
const db_config_controller_1 = require("./db-config.controller");
const router = (0, express_1.Router)();
const controller = new db_backup_controller_1.DBBackupController();
const controllerConfig = new db_config_controller_1.DBConfigController();
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.get("/list", (0, asyncHandler_1.asyncHandler)(controller.list.bind(controller)));
router.get("/download/:filename", (0, asyncHandler_1.asyncHandler)(controller.download.bind(controller)));
router.post("/backup", (0, asyncHandler_1.asyncHandler)(controller.backup.bind(controller)));
router.patch("/restore/:backupfile", (0, asyncHandler_1.asyncHandler)(controller.restore.bind(controller)));
router.patch("/rename/:filename", (0, asyncHandler_1.asyncHandler)(controller.rename.bind(controller)));
router.delete("/delete/:filename", (0, asyncHandler_1.asyncHandler)(controller.delete.bind(controller)));
router.post("/upload", upload.single("file"), (0, asyncHandler_1.asyncHandler)(controller.upload.bind(controller)));
router.post("/config/dropAndSync", (0, asyncHandler_1.asyncHandler)(controllerConfig.dropAndSync.bind(controllerConfig)));
router.post("/config/runSeeders", (0, asyncHandler_1.asyncHandler)(controllerConfig.runSeeders.bind(controllerConfig)));
router.post("/config/dropAndSeed", (0, asyncHandler_1.asyncHandler)(controllerConfig.dropAndSeed.bind(controllerConfig)));
exports.default = router;
//# sourceMappingURL=database.routes.js.map