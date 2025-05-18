"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenerService = void 0;
const data_source_1 = require("../../config/data-source");
const shortener_entity_1 = require("./entities/shortener.entity");
const nanoid_1 = require("nanoid");
const shortener_visit_entity_1 = require("./entities/shortener-visit.entity");
class ShortenerService {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(shortener_entity_1.ShortUrlEntity);
        this.visitRepo = data_source_1.AppDataSource.getRepository(shortener_visit_entity_1.ShortenerVisitEntity);
    }
    async findAll() {
        return await this.repo.find();
    }
    async findAllFilter(params = {}) {
        const { page = 1, limit = 10, search, dateVisitFrom, dateVisitTo, sortVisitCount } = params;
        const skip = (page - 1) * limit;
        const query = this.repo.createQueryBuilder("shortener").leftJoinAndSelect("shortener.visits", "visit");
        if (search) {
            query.andWhere("LOWER(shortener.shortCode) LIKE :search", {
                search: `%${search.toLowerCase()}%`,
            });
        }
        // 👇 Obtener todos los resultados (aún sin aplicar paginación)
        const [results] = await query.getManyAndCount();
        // 👇 Usar últimas 24 horas si no se pasó rango
        const fromDate = dateVisitFrom ? new Date(dateVisitFrom) : new Date(Date.now() - 24 * 60 * 60 * 1000);
        const toDate = dateVisitTo ? new Date(dateVisitTo) : new Date();
        const filteredResults = results.map((shortener) => {
            let filteredVisits = shortener.visits ?? [];
            filteredVisits = filteredVisits.filter((v) => {
                const visitedAt = new Date(v.visitedAt);
                return visitedAt >= fromDate && visitedAt <= toDate;
            });
            return {
                ...shortener,
                visits: filteredVisits,
                visitCount: filteredVisits.length,
            };
        });
        // 👇 Ordenar por cantidad de visitas si se solicitó
        if (sortVisitCount === "ASC") {
            filteredResults.sort((a, b) => a.visitCount - b.visitCount);
        }
        else if (sortVisitCount === "DESC") {
            filteredResults.sort((a, b) => b.visitCount - a.visitCount);
        }
        // 👇 Aplicar paginación después del ordenamiento
        const paginatedResults = filteredResults.slice(skip, skip + limit);
        return {
            total: filteredResults.length,
            page,
            totalPages: Math.ceil(filteredResults.length / limit),
            results: paginatedResults,
        };
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
    async findOne(id) {
        return await this.repo.findOneBy({ id });
    }
    async remove(id) {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
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
    async registerVisit(shortenerId, data) {
        const visit = this.visitRepo.create({ ...data, shortenerId });
        return this.visitRepo.save(visit);
    }
}
exports.ShortenerService = ShortenerService;
//# sourceMappingURL=shortener.service.js.map