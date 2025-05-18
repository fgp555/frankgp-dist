"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAcademyCourse = void 0;
const data_source_1 = require("../../../config/data-source");
const course_entity_1 = require("../../../module/academy/dtos-entities/course.entity");
const category_entity_1 = require("../../../module/academy/dtos-entities/category.entity");
const courses_data_json_1 = __importDefault(require("./courses.data.json"));
const seedAcademyCourse = async () => {
    const courseRepo = data_source_1.AppDataSource.getRepository(course_entity_1.CourseEntity);
    const categoryRepo = data_source_1.AppDataSource.getRepository(category_entity_1.CategoryEntity);
    const count = await courseRepo.count();
    if (count === 0) {
        const coursesToSave = [];
        for (const course of courses_data_json_1.default) {
            let category = null;
            if (course.category) {
                category = await categoryRepo.findOneBy({ name: course.category });
                // Si no existe, la creamos
                if (!category) {
                    category = categoryRepo.create({ name: course.category });
                    category = await categoryRepo.save(category);
                }
            }
            const newCourse = courseRepo.create({
                ...course,
                category,
            });
            coursesToSave.push(newCourse);
        }
        await courseRepo.save(coursesToSave);
        console.log("🌱 CourseSeeder seed complete ✅");
    }
    else {
        console.log("ℹ️ CourseSeeder table already has data. Seed skipped.");
    }
};
exports.seedAcademyCourse = seedAcademyCourse;
//# sourceMappingURL=courses.seed.js.map