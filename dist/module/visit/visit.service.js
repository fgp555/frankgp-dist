"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitService = void 0;
// src/module/visit/visit.service.ts
const data_source_1 = require("../../config/data-source");
const visit_middleware_1 = require("../../middleware/visit.middleware");
const visit_entity_1 = require("./visit.entity");
class VisitService {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(visit_entity_1.VisitEntity);
    }
    async findAll() {
        return this.repo.find({
            order: { visitedAt: "DESC" }, // opcional: ordenar por fecha
        });
    }
    async findAllMock() {
        // Retornar ordenado por fecha descendente
        return visit_middleware_1.visitDataMock.sort((a, b) => b.visitedAt.getTime() - a.visitedAt.getTime());
    }
}
exports.VisitService = VisitService;
//# sourceMappingURL=visit.service.js.map