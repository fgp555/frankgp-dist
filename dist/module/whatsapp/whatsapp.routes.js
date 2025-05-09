"use strict";
// src/module/whatsapp/whatsapp.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_controller_1 = require("./webhook.controller");
const whatsapp_controller_1 = require("./whatsapp.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const whatsapp_sender_controller_1 = require("./whatsapp-sender.controller");
const router = (0, express_1.Router)();
const webhook = new webhook_controller_1.WebhookController();
const whatsapp = new whatsapp_controller_1.WhatsappController();
const sender = new whatsapp_sender_controller_1.SenderController();
router.get("/webhook", (0, asyncHandler_1.asyncHandler)(webhook.verify.bind(webhook)));
router.post("/webhook", (0, asyncHandler_1.asyncHandler)(webhook.receive.bind(webhook)));
router.get("/messages", (0, asyncHandler_1.asyncHandler)(whatsapp.getAll.bind(whatsapp)));
router.get("/messages/getById/:id", (0, asyncHandler_1.asyncHandler)(whatsapp.getById.bind(whatsapp)));
router.get("/messages/WHATSAPP_ID/:id", (0, asyncHandler_1.asyncHandler)(whatsapp.getMessageByWHATSAPP_ID.bind(whatsapp)));
router.get("/messages/entry_id/:entry_id", (0, asyncHandler_1.asyncHandler)(whatsapp.getByEntryId.bind(whatsapp)));
router.post("/messages/send", (0, asyncHandler_1.asyncHandler)(sender.sendMessage.bind(sender)));
exports.default = router;
//# sourceMappingURL=whatsapp.routes.js.map