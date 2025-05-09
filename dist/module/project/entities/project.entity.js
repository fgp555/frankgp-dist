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
exports.ProjectEntity = void 0;
const typeorm_1 = require("typeorm");
const project_image_entity_1 = require("./project-image.entity");
const project_button_entity_1 = require("./project-button.entity");
const language_entity_1 = require("./language.entity");
const project_content_entity_1 = require("./project-content.entity");
let ProjectEntity = class ProjectEntity {
};
exports.ProjectEntity = ProjectEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ProjectEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "github", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_image_entity_1.ProjectImage, (img) => img.project, { cascade: true }),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_button_entity_1.ProjectButton, (btn) => btn.project, { cascade: true }),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "buttons", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => language_entity_1.Language, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "languages", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => project_content_entity_1.ProjectContent, (content) => content.project, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", project_content_entity_1.ProjectContent)
], ProjectEntity.prototype, "content", void 0);
exports.ProjectEntity = ProjectEntity = __decorate([
    (0, typeorm_1.Entity)()
], ProjectEntity);
//# sourceMappingURL=project.entity.js.map