"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappController = void 0;
const whatsapp_service_1 = require("./whatsapp.service");
const error_middleware_1 = require("../../middleware/error.middleware");
class WhatsappController {
    constructor() {
        this.service = new whatsapp_service_1.WhatsappService();
    }
    async getAll(req, res, next) {
        try {
            const messages = await this.service.getAllMessages();
            res.json(messages);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id))
                throw new error_middleware_1.AppError("Invalid ID", 400);
            const message = await this.service.getMessageById(id);
            if (!message)
                throw new error_middleware_1.AppError("Message not found", 404);
            res.json(message);
        }
        catch (error) {
            next(error);
        }
    }
    async getMessageByWHATSAPP_ID(req, res, next) {
        try {
            const id = req.params.id;
            if (!id)
                throw new error_middleware_1.AppError("Invalid ID", 400); // Se valida si el ID es inválido
            const message = await this.service.getMessageByWHATSAPP_ID(id);
            if (!message)
                throw new error_middleware_1.AppError("Message not found", 404);
            res.json(message);
        }
        catch (error) {
            next(error);
        }
    }
    async getByEntryId(req, res, next) {
        try {
            const entryId = req.params.entry_id;
            if (!entryId)
                throw new error_middleware_1.AppError("entry_id is required", 400);
            const messages = await this.service.getMessagesByEntryId(entryId);
            res.json(messages);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.WhatsappController = WhatsappController;
//# sourceMappingURL=whatsapp.controller.js.map