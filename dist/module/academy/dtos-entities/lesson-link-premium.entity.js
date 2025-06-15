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
exports.LessonLinkPremiumEntity = void 0;
const typeorm_1 = require("typeorm");
const lesson_entity_1 = require("./lesson.entity");
let LessonLinkPremiumEntity = class LessonLinkPremiumEntity {
};
exports.LessonLinkPremiumEntity = LessonLinkPremiumEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LessonLinkPremiumEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LessonLinkPremiumEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LessonLinkPremiumEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.LessonEntity, (project) => project.links),
    __metadata("design:type", lesson_entity_1.LessonEntity)
], LessonLinkPremiumEntity.prototype, "lesson", void 0);
exports.LessonLinkPremiumEntity = LessonLinkPremiumEntity = __decorate([
    (0, typeorm_1.Entity)("lesson_link_premium")
], LessonLinkPremiumEntity);
//# sourceMappingURL=lesson-link-premium.entity.js.map