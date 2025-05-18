"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenerService = void 0;
const data_source_1 = require("../../config/data-source");
const shortener_entity_1 = require("./entities/shortener.entity");
const nanoid_1 = require("nanoid");
const shortener_visit_entity_1 = require("./entities/shortener-visit.entity");
class ShortenerService {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(shortener_entity_1.ShortenerEntity);
        this.visitRepo = data_source_1.AppDataSource.getRepository(shortener_visit_entity_1.ShortenerVisitEntity);
    }
    async findAll() {
        return await this.repo.find();
    }
    async findAllSelect() {
        return await this.repo.find({
            select: ["backHalf", "destination"],
        });
    }
    async findAllFilter(params = {}) {
        const { page, limit, search, dateVisitFrom, dateVisitTo, sortVisitCount } = params;
        const query = this.repo.createQueryBuilder("shortener").leftJoinAndSelect("shortener.visits", "visit");
        if (search) {
            query.andWhere("LOWER(shortener.backHalf) LIKE :search", {
                search: `%${search.toLowerCase()}%`,
            });
        }
        // Obtener todos los resultados
        const [results] = await query.getManyAndCount();
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
        // Ordenar si se solicitó
        if (sortVisitCount === "ASC") {
            filteredResults.sort((a, b) => a.visitCount - b.visitCount);
        }
        else if (sortVisitCount === "DESC") {
            filteredResults.sort((a, b) => b.visitCount - a.visitCount);
        }
        // 👇 Si page o limit no vienen definidos, devolver todo
        if (!page || !limit) {
            return {
                page: 1,
                totalPages: 1,
                totalItems: filteredResults.length,
                hasMore: false,
                results: filteredResults,
            };
        }
        const skip = (page - 1) * limit;
        const paginatedResults = filteredResults.slice(skip, skip + limit);
        return {
            page,
            totalPages: Math.ceil(filteredResults.length / limit),
            totalItems: filteredResults.length,
            hasMore: page * limit < filteredResults.length,
            results: paginatedResults,
        };
    }
    async create(destination, backHalf) {
        const backHalfResult = backHalf || (0, nanoid_1.nanoid)(6);
        // Verificar si ya existe ese código
        const exists = await this.repo.findOneBy({ backHalf: backHalfResult });
        if (exists) {
            throw new Error("Short code already in use");
        }
        const short = this.repo.create({ backHalf: backHalfResult, destination });
        return await this.repo.save(short);
    }
    async findByCode(code) {
        return await this.repo.findOneBy({ backHalf: code });
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
        if (data.backHalf && data.backHalf !== record.backHalf) {
            const exists = await this.repo.findOneBy({ backHalf: data.backHalf });
            if (exists)
                throw new Error("Custom code already in use");
            record.backHalf = data.backHalf;
        }
        if (data.destination) {
            record.destination = data.destination;
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