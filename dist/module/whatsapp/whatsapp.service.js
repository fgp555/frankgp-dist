"use strict";
// src/module/whatsapp/whatsapp.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappService = void 0;
const data_source_1 = require("../../config/data-source");
const whatsapp_message_entity_1 = require("./entities/whatsapp-message.entity"); // Asegúrate de importar correctamente
class WhatsappService {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(whatsapp_message_entity_1.WhatsappMessageEntity);
    }
    // Guarda o actualiza un mensaje entrante
    async saveOrUpdateMessage(data) {
        const existing = await this.repo.findOneBy({ messages_id: data.messages_id });
        if (existing) {
            this.repo.merge(existing, data);
            return await this.repo.save(existing);
        }
        const newMessage = this.repo.create(data);
        return await this.repo.save(newMessage);
    }
    // Actualiza el estado del mensaje por messages_id
    async updateStatusByMessageId(messageId, data) {
        const existing = await this.repo.findOneBy({ messages_id: messageId });
        if (!existing) {
            // Si no existe, decidimos si crear uno nuevo
            const newMessage = this.repo.create({ ...data, messages_id: messageId });
            return await this.repo.save(newMessage);
        }
        this.repo.merge(existing, data);
        return await this.repo.save(existing);
    }
    // Obtiene todos los mensajes ordenados por fecha
    async getAllMessages() {
        return await this.repo.find({ order: { createdAt: "DESC" } });
    }
    // Obtiene un mensaje por ID
    async getMessageById(id) {
        return await this.repo.findOneBy({ id });
    }
    async getMessageByWHATSAPP_ID(WHATSAPP_ID) {
        return await this.repo.findBy({ WHATSAPP_ID });
    }
    async getMessagesByEntryId(entryId) {
        return await this.repo.find({
            where: { entry_id: entryId },
            order: { createdAt: "DESC" },
        });
    }
}
exports.WhatsappService = WhatsappService;
//# sourceMappingURL=whatsapp.service.js.map