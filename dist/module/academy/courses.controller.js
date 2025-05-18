"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesController = void 0;
const courses_service_1 = require("./courses.service");
const service = new courses_service_1.CoursesService();
class CoursesController {
    async create(req, res) {
        const course = await service.create(req.body);
        res.json(course);
    }
    async findAll(req, res) {
        const courses = await service.findAll();
        res.json(courses);
    }
    async findOne(req, res) {
        const course = await service.findOne(+req.params.id);
        res.json(course);
    }
    async findSlug(req, res) {
        const course = await service.findSlug(req.params.slug);
        res.json(course);
    }
    async update(req, res) {
        const course = await service.update(+req.params.id, req.body);
        res.json(course);
    }
    async remove(req, res) {
        await service.remove(+req.params.id);
        res.json({ message: "Curso eliminado" });
    }
}
exports.CoursesController = CoursesController;
//# sourceMappingURL=courses.controller.js.map