"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonEntity = void 0;
const typeorm_1 = require("typeorm");
const section_entity_1 = require("./section.entity");
const lesson_link_entity_1 = require("./lesson-link.entity");
const lesson_link_premium_entity_1 = require("./lesson-link-premium.entity");
let LessonEntity = class LessonEntity {
};
exports.LessonEntity = LessonEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LessonEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LessonEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, charset: "utf8mb4", collation: "utf8mb4_unicode_ci" }),
    __metadata("design:type", String)
], LessonEntity.prototype, "labelLesson", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true, charset: "utf8mb4", collation: "utf8mb4_unicode_ci" }),
    __metadata("design:type", String)
], LessonEntity.prototype, "titleLesson", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true, charset: "utf8mb4", collation: "utf8mb4_unicode_ci" }),
    __metadata("design:type", String)
], LessonEntity.prototype, "descriptionLesson", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], LessonEntity.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LessonEntity.prototype, "youtubeUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LessonEntity.prototype, "vkUrl", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], LessonEntity.prototype, "markdownUrl", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], LessonEntity.prototype, "markdownUrlPremium", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_link_entity_1.LessonLinkEntity, (link) => link.lesson, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], LessonEntity.prototype, "links", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_link_premium_entity_1.LessonLinkPremiumEntity, (link) => link.lesson, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], LessonEntity.prototype, "linksPremium", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "lesson_order", default: 1 }),
    __metadata("design:type", Number)
], LessonEntity.prototype, "lessonOrder", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => section_entity_1.SectionEntity, (section) => section.lessons, { onDelete: "CASCADE" }),
    __metadata("design:type", section_entity_1.SectionEntity)
], LessonEntity.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], LessonEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], LessonEntity.prototype, "updatedAt", void 0);
exports.LessonEntity = LessonEntity = __decorate([
    (0, typeorm_1.Entity)("lessons")
], LessonEntity);
//# sourceMappingURL=lesson.entity.js.map