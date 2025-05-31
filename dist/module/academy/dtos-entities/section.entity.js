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
exports.SectionEntity = void 0;
const typeorm_1 = require("typeorm");
const course_entity_1 = require("./course.entity");
const lesson_entity_1 = require("./lesson.entity");
let SectionEntity = class SectionEntity {
};
exports.SectionEntity = SectionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SectionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SectionEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], SectionEntity.prototype, "titleSection", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "section_order", default: 1 }),
    __metadata("design:type", Number)
], SectionEntity.prototype, "sectionOrder", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.CourseEntity, (course) => course.sections, { onDelete: "CASCADE" }),
    __metadata("design:type", course_entity_1.CourseEntity)
], SectionEntity.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_entity_1.LessonEntity, (lesson) => lesson.section, {
        onDelete: "CASCADE",
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], SectionEntity.prototype, "lessons", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], SectionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], SectionEntity.prototype, "updatedAt", void 0);
exports.SectionEntity = SectionEntity = __decorate([
    (0, typeorm_1.Entity)("sections")
], SectionEntity);
//# sourceMappingURL=section.entity.js.map