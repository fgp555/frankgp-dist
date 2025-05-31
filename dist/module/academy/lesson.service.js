"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const lesson_entity_1 = require("./dtos-entities/lesson.entity");
const data_source_1 = require("../../config/data-source");
const section_entity_1 = require("./dtos-entities/section.entity");
class LessonService {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(lesson_entity_1.LessonEntity);
        this.sectionRepo = data_source_1.AppDataSource.getRepository(section_entity_1.SectionEntity);
    }
    async create(data) {
        const section = await this.sectionRepo.findOneByOrFail({ id: data.sectionId });
        const lesson = this.repo.create({
            labelLesson: data.labelLesson,
            descriptionLesson: data.descriptionLesson,
            lessonOrder: data.lessonOrder || 1,
            section,
        });
        return await this.repo.save(lesson);
    }
    async findAll() {
        return await this.repo.find();
    }
    async findOne(id) {
        return await this.repo.findOne({
            where: { id },
        });
    }
    async findSlug(slug) {
        return await this.repo.findOne({
            where: { slug },
        });
    }
    async findBySection(sectionId) {
        return await this.repo.find({
            where: { section: { id: sectionId } },
            order: { lessonOrder: "ASC" },
            relations: ["section"],
        });
    }
    async update(id, data) {
        const lesson = await this.repo.findOneByOrFail({ id });
        this.repo.merge(lesson, data);
        return await this.repo.save(lesson);
    }
    async remove(id) {
        await this.repo.delete(id);
        return { message: "Lesson deleted successfully" };
    }
}
exports.LessonService = LessonService;
//# sourceMappingURL=lesson.service.js.map