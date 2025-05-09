"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenerService = void 0;
const data_source_1 = require("../../config/data-source");
const shortener_entity_1 = require("./shortener.entity");
const nanoid_1 = require("nanoid");
class ShortenerService {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(shortener_entity_1.ShortUrlEntity);
    }
    async create(originalUrl, customCode) {
        const shortCode = customCode || (0, nanoid_1.nanoid)(6);
        // Verificar si ya existe ese código
        const exists = await this.repo.findOneBy({ shortCode });
        if (exists) {
            throw new Error("Short code already in use");
        }
        const short = this.repo.create({ shortCode, originalUrl });
        return await this.repo.save(short);
    }
    async findByCode(code) {
        return await this.repo.findOneBy({ shortCode: code });
    }
    async findAll() {
        return await this.repo.find();
    }
    async update(id, data) {
        const record = await this.repo.findOneBy({ id });
        if (!record)
            return null;
        // Si el código personalizado cambia, verificar si ya existe
        if (data.customCode && data.customCode !== record.shortCode) {
            const exists = await this.repo.findOneBy({ shortCode: data.customCode });
            if (exists)
                throw new Error("Custom code already in use");
            record.shortCode = data.customCode;
        }
        if (data.originalUrl) {
            record.originalUrl = data.originalUrl;
        }
        return await this.repo.save(record);
    }
}
exports.ShortenerService = ShortenerService;
//# sourceMappingURL=shortener.service.js.map