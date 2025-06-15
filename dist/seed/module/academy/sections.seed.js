"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAcademySection = void 0;
const data_source_1 = require("../../../config/data-source");
const section_entity_1 = require("../../../module/academy/dtos-entities/section.entity");
const course_entity_1 = require("../../../module/academy/dtos-entities/course.entity");
const sections_data_aws_json_1 = __importDefault(require("./section-devops/sections.data.aws.json"));
const sections_data_azure_json_1 = __importDefault(require("./section-devops/sections.data.azure.json"));
const sections_data_cpanel_json_1 = __importDefault(require("./section-devops/sections.data.cpanel.json"));
const sections_data_cloudflare_json_1 = __importDefault(require("./section-system/sections.data.cloudflare.json"));
const sections_data_n8n_json_1 = __importDefault(require("./section-system/sections.data.n8n.json"));
const sections_data_windows_json_1 = __importDefault(require("./section-system/sections.data.windows.json"));
const sections_data_springboot_json_1 = __importDefault(require("./section-dev/sections.data.springboot.json"));
// sections.data.springboot
const seedAcademySection = async () => {
    const sectionRepo = data_source_1.AppDataSource.getRepository(section_entity_1.SectionEntity);
    const courseRepo = data_source_1.AppDataSource.getRepository(course_entity_1.CourseEntity);
    const count = await sectionRepo.count();
    if (count === 0) {
        const allData = [
            // dev
            // ...dataWhatsapp,
            ...sections_data_springboot_json_1.default,
            // devops
            ...sections_data_aws_json_1.default,
            ...sections_data_azure_json_1.default,
            ...sections_data_cpanel_json_1.default,
            // system
            ...sections_data_cloudflare_json_1.default,
            ...sections_data_n8n_json_1.default,
            ...sections_data_windows_json_1.default,
            //
        ];
        for (const item of allData) {
            const course = await courseRepo.findOneBy({ id: item.courseId });
            if (!course) {
                console.warn(`⚠️ Course with id ${item.courseId} not found. Skipping section "${item.titleSection}"`);
                continue;
            }
            const section = sectionRepo.create({
                slug: item.slug,
                titleSection: item.titleSection,
                sectionOrder: item.sectionOrder,
                course,
                lessons: item.lessons || [],
            });
            await sectionRepo.save(section);
        }
        console.log("🌱 SectionSeeder seed complete ✅");
    }
    else {
        console.log("ℹ️ SectionSeeder table already has data. Seed skipped.");
    }
};
exports.seedAcademySection = seedAcademySection;
//# sourceMappingURL=sections.seed.js.map