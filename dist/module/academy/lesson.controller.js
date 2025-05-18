"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonController = void 0;
const lesson_service_1 = require("./lesson.service");
class LessonController {
    constructor() {
        this.service = new lesson_service_1.LessonService();
    }
    async create(req, res) {
        const lesson = await this.service.create(req.body);
        res.json(lesson);
    }
    async findAll(_req, res) {
        const lessons = await this.service.findAll();
        res.json(lessons);
    }
    async findOne(req, res) {
        const id = parseInt(req.params.id);
        const lesson = await this.service.findOne(id);
        if (!lesson)
            return res.status(404).json({ message: "Lesson not found" });
        res.json(lesson);
    }
    async findSlug(req, res) {
        const slug = req.params.slug;
        const lesson = await this.service.findSlug(slug);
        if (!lesson)
            return res.status(404).json({ message: "Lesson not found" });
        res.json(lesson);
    }
    async findBySection(req, res) {
        const sectionId = parseInt(req.params.sectionId);
        const lessons = await this.service.findBySection(sectionId);
        res.json(lessons);
    }
    async update(req, res) {
        const id = parseInt(req.params.id);
        const updated = await this.service.update(id, req.body);
        res.json(updated);
    }
    async remove(req, res) {
        const id = parseInt(req.params.id);
        const result = await this.service.remove(id);
        res.json(result);
    }
}
exports.LessonController = LessonController;
//# sourceMappingURL=lesson.controller.js.map