"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const database_controller_1 = require("./database.controller");
const router = (0, express_1.Router)();
const controller = new database_controller_1.DatabaseController();
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.get("/backupMySQL", (0, asyncHandler_1.asyncHandler)(controller.backupMySQL.bind(controller)));
router.get("/listBackups", (0, asyncHandler_1.asyncHandler)(controller.listBackups.bind(controller)));
router.delete("/backup/:filename", (0, asyncHandler_1.asyncHandler)(controller.deleteBackup.bind(controller)));
router.patch("/backup/:filename", (0, asyncHandler_1.asyncHandler)(controller.renameBackup.bind(controller)));
router.patch("/restore/:filename", (0, asyncHandler_1.asyncHandler)(controller.restoreFromFile.bind(controller)));
router.get("/download/:filename", (0, asyncHandler_1.asyncHandler)(controller.downloadFromFile.bind(controller)));
router.post("/restore", upload.single("file"), (0, asyncHandler_1.asyncHandler)(controller.restore.bind(controller)));
exports.default = router;
//# sourceMappingURL=database.routes.js.map