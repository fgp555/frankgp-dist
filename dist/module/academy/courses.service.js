"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const data_source_1 = require("../../config/data-source");
const course_entity_1 = require("./dtos-entities/course.entity");
const lesson_entity_1 = require("./dtos-entities/lesson.entity");
const category_entity_1 = require("./dtos-entities/category.entity");
class CoursesService {
    constructor() {
        this.courseRepo = data_source_1.AppDataSource.getRepository(course_entity_1.CourseEntity);
        this.categoryRepo = data_source_1.AppDataSource.getRepository(category_entity_1.CategoryEntity);
        this.lessonRepo = data_source_1.AppDataSource.getRepository(lesson_entity_1.LessonEntity);
    }
    async create(data) {
        let category = null;
        if (data.categoryName) {
            category = await this.categoryRepo.findOneBy({ name: data.categoryName });
            if (!category) {
                category = this.categoryRepo.create({ name: data.categoryName });
                category = await this.categoryRepo.save(category);
            }
        }
        const course = this.courseRepo.create({
            ...data,
            category,
        });
        return await this.courseRepo.save(course);
    }
    async findAll() {
        return await this.courseRepo.find({
            relations: ["category", "sections", "sections.lessons"],
        });
    }
    async findOne(id) {
        return await this.courseRepo.findOne({
            where: { id },
            relations: ["category", "sections", "sections.lessons"],
        });
    }
    async findSlug(slug) {
        return await this.courseRepo.findOne({
            where: { slug },
            relations: ["category", "sections", "sections.lessons"],
        });
    }
    async update(id, data) {
        const course = await this.courseRepo.findOneBy({ id });
        if (!course)
            return null;
        if (data.categoryName) {
            let category = await this.categoryRepo.findOneBy({ name: data.categoryName });
            if (!category) {
                category = this.categoryRepo.create({ name: data.categoryName });
                category = await this.categoryRepo.save(category);
            }
            course.category = category;
        }
        this.courseRepo.merge(course, data);
        return await this.courseRepo.save(course);
    }
    async remove(id) {
        return await this.courseRepo.delete(id);
    }
}
exports.CoursesService = CoursesService;
//# sourceMappingURL=courses.service.js.map