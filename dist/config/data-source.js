"use strict";
// src/config/data-source.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectionSource = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const options_entity_1 = require("../module/options/options.entity");
const shortener_visit_entity_1 = require("../module/shortener/entities/shortener-visit.entity");
const shortener_entity_1 = require("../module/shortener/entities/shortener.entity");
const stat_entity_1 = require("../module/stat/entities/stat.entity");
const user_entity_1 = require("../module/auth/user/dtos-entities/user.entity");
const visit_entity_1 = require("../module/visit/visit.entity");
const whatsapp_message_entity_1 = require("../module/whatsapp/entities/whatsapp-message.entity");
const project_entity_1 = require("../module/project/entities/project.entity");
const project_image_entity_1 = require("../module/project/entities/project-image.entity");
const project_dates_embeddable_1 = require("../module/project/entities/project-dates.embeddable");
const project_link_entity_1 = require("../module/project/entities/project-link.entity");
const project_technology_entity_1 = require("../module/project/entities/project-technology.entity");
const project_collaborator_entity_1 = require("../module/project/entities/project-collaborator.entity");
const user_entity_2 = require("../module/project/entities/user.entity");
const user_link_entity_1 = require("../module/project/entities/user-link.entity");
const user_skill_entity_1 = require("../module/project/entities/user-skill.entity");
const project_skill_entity_1 = require("../module/project/entities/project-skill.entity");
const product_entity_1 = require("../module/store/product/product.entity");
const course_entity_1 = require("../module/academy/dtos-entities/course.entity");
const lesson_entity_1 = require("../module/academy/dtos-entities/lesson.entity");
const section_entity_1 = require("../module/academy/dtos-entities/section.entity");
const category_entity_1 = require("../module/academy/dtos-entities/category.entity");
const lesson_link_entity_1 = require("../module/academy/dtos-entities/lesson-link.entity");
const lesson_link_premium_entity_1 = require("../module/academy/dtos-entities/lesson-link-premium.entity");
const entities = [
    options_entity_1.OptionsEntity,
    shortener_visit_entity_1.ShortenerVisitEntity,
    shortener_entity_1.ShortenerEntity,
    stat_entity_1.StatEntity,
    user_entity_1.UserEntity,
    visit_entity_1.VisitEntity,
    whatsapp_message_entity_1.WhatsappMessageEntity,
    project_entity_1.ProjectEntity,
    project_image_entity_1.ProjectImageEntity,
    project_dates_embeddable_1.ProjectDates,
    project_link_entity_1.ProjectLinkEntity,
    project_technology_entity_1.TechnologyEntity,
    project_collaborator_entity_1.CollaboratorEntity,
    user_skill_entity_1.SkillUserEntity,
    project_skill_entity_1.ProjectSkillEntity,
    user_entity_2.ProjectUserEntity,
    user_link_entity_1.UserLinkEntity,
    product_entity_1.ProductEntity,
    course_entity_1.CourseEntity,
    lesson_entity_1.LessonEntity,
    section_entity_1.SectionEntity,
    category_entity_1.CategoryEntity,
    lesson_link_entity_1.LessonLinkEntity,
    lesson_link_premium_entity_1.LessonLinkPremiumEntity,
];
// Configuración de TypeORM
const typeOrmConfig = {
    type: envs_1.ENV.DB_TYPE,
    host: envs_1.ENV.DB_HOST,
    port: envs_1.ENV.DB_PORT,
    username: envs_1.ENV.DB_USERNAME,
    password: envs_1.ENV.DB_PASSWORD,
    database: envs_1.ENV.DB_DATABASE,
    synchronize: envs_1.ENV.DROPSCHEMA,
    dropSchema: envs_1.ENV.DROPSCHEMA,
    logging: ["error"],
    entities: entities,
    migrations: ["dist/migrations/*{.ts,.js}"],
    subscribers: [],
    ssl: envs_1.ENV.DB_SSL, // Configuración SSL opcional
};
// Crear la instancia de DataSource
exports.AppDataSource = new typeorm_1.DataSource(typeOrmConfig);
// Exporta el tipo para uso global en otras partes de la app
exports.conectionSource = new typeorm_1.DataSource(typeOrmConfig);
//# sourceMappingURL=data-source.js.map