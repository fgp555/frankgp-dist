"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitController = void 0;
const visit_service_1 = require("./visit.service");
const service = new visit_service_1.VisitService();
class VisitController {
    async findAll(req, res, next) {
        try {
            const visits = await service.findAll();
            res.json(visits);
        }
        catch (err) {
            next(err);
        }
    }
    async findAllMock(req, res, next) {
        try {
            const visits = await service.findAllMock();
            res.json(visits);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.VisitController = VisitController;
//# sourceMappingURL=visit.controller.js.map