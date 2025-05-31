"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionService = void 0;
const section_entity_1 = require("./dtos-entities/section.entity");
const data_source_1 = require("../../config/data-source");
const course_entity_1 = require("./dtos-entities/course.entity");
class SectionService {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(section_entity_1.SectionEntity);
        this.courseRepo = data_source_1.AppDataSource.getRepository(course_entity_1.CourseEntity);
    }
    async create(data) {
        const course = await this.courseRepo.findOneByOrFail({ id: data.courseId });
        const section = this.repo.create({
            titleSection: data.titleSection,
            sectionOrder: data.sectionOrder || 1,
            course,
        });
        return await this.repo.save(section);
    }
    async findAll() {
        return await this.repo.find({ relations: ["course"] });
    }
    async findOne(id) {
        return await this.repo.findOne({
            where: { id },
            relations: ["course"],
        });
    }
    async findByCourse(courseId) {
        return await this.repo.find({
            where: { course: { id: courseId } },
            order: { sectionOrder: "ASC" },
            relations: ["course"],
        });
    }
    async update(id, data) {
        const section = await this.repo.findOneByOrFail({ id });
        this.repo.merge(section, data);
        return await this.repo.save(section);
    }
    async remove(id) {
        await this.repo.delete(id);
        return { message: "Section deleted successfully" };
    }
}
exports.SectionService = SectionService;
//# sourceMappingURL=section.service.js.map