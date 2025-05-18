"use strict";
// src/module/stat/stat.analytics.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatAnalyticsService = void 0;
const data_source_1 = require("../../config/data-source");
const stat_entity_1 = require("./entities/stat.entity");
const typeorm_1 = require("typeorm");
class StatAnalyticsService {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(stat_entity_1.StatEntity);
    }
    async getSummary() {
        const total = await this.repo.count();
        const today = await this.repo.count({
            where: {
                createdAt: (0, typeorm_1.MoreThanOrEqual)(new Date(new Date().setHours(0, 0, 0, 0))),
            },
        });
        const uniqueVisitors = await this.repo.createQueryBuilder("stat").select("DISTINCT stat.ip").getCount();
        const countries = await this.repo
            .createQueryBuilder("stat")
            .select("stat.countryName", "country")
            .addSelect("COUNT(*)", "count")
            .groupBy("stat.countryName")
            .orderBy("count", "DESC")
            .getRawMany();
        const topPages = await this.repo
            .createQueryBuilder("stat")
            .select("stat.currentURL", "url")
            .addSelect("COUNT(*)", "visits")
            .groupBy("stat.currentURL")
            .orderBy("visits", "DESC")
            .limit(5)
            .getRawMany();
        return { total, today, uniqueVisitors, countries, topPages };
    }
    async getByDate(from, to) {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        const records = await this.repo
            .createQueryBuilder("stat")
            .select("DATE(stat.createdAt)", "date")
            .addSelect("COUNT(*)", "visits")
            .where("stat.createdAt BETWEEN :from AND :to", { from: fromDate, to: toDate })
            .groupBy("DATE(stat.createdAt)")
            .orderBy("date", "ASC")
            .getRawMany();
        return records;
    }
    async getByCountry() {
        return await this.repo
            .createQueryBuilder("stat")
            .select("stat.countryName", "country")
            .addSelect("COUNT(*)", "visits")
            .groupBy("stat.countryName")
            .orderBy("visits", "DESC")
            .getRawMany();
    }
    async getByURL(params) {
        let { dateFrom, dateTo } = params || {};
        if (!dateFrom || !dateTo) {
            const now = new Date();
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() - 1);
            dateFrom = yesterday.toISOString();
            dateTo = now.toISOString();
        }
        return await this.repo
            .createQueryBuilder("stat")
            .select("stat.currentURL", "url")
            .addSelect("COUNT(*)", "visits")
            .where("stat.createdAt BETWEEN :from AND :to", {
            from: new Date(dateFrom),
            to: new Date(dateTo),
        })
            .groupBy("stat.currentURL")
            .orderBy("visits", "DESC")
            .getRawMany();
    }
    async getByAffiliate(source) {
        return await this.repo
            .createQueryBuilder("stat")
            .select("stat.referrerURL", "source")
            .addSelect("COUNT(*)", "visits")
            .where("stat.referrerURL LIKE :source", { source: `%${source}%` })
            .groupBy("stat.referrerURL")
            .orderBy("visits", "DESC")
            .getRawMany();
    }
}
exports.StatAnalyticsService = StatAnalyticsService;
//# sourceMappingURL=stat.analytics.service.js.map