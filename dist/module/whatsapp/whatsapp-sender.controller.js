"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SenderController = void 0;
const error_middleware_1 = require("../../middleware/error.middleware");
const whatsapp_sender_service_1 = require("./whatsapp-sender.service");
class SenderController {
    constructor() {
        this.senderService = new whatsapp_sender_service_1.SenderService();
    }
    async sendMessage(req, res, next) {
        try {
            const { to, message } = req.body;
            if (!to || !message) {
                throw new error_middleware_1.AppError("Missing 'to' or 'message' in request body", 400);
            }
            const result = await this.senderService.sendTextMessage(to, message);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SenderController = SenderController;
//# sourceMappingURL=whatsapp-sender.controller.js.map