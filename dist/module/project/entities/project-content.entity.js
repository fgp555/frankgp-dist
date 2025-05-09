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
exports.ProjectContent = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./project.entity");
const project_feature_entity_1 = require("./project-feature.entity");
const project_date_entity_1 = require("./project-date.entity");
const project_collaborator_entity_1 = require("./project-collaborator.entity");
const project_technologies_entity_1 = require("./project-technologies.entity");
let ProjectContent = class ProjectContent {
};
exports.ProjectContent = ProjectContent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProjectContent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectContent.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectContent.prototype, "subtitle", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectContent.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectContent.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectContent.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => project_entity_1.ProjectEntity, (project) => project.content),
    __metadata("design:type", project_entity_1.ProjectEntity)
], ProjectContent.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_feature_entity_1.ProjectFeature, (f) => f.content, { cascade: true }),
    __metadata("design:type", Array)
], ProjectContent.prototype, "features", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_date_entity_1.ProjectDate, (d) => d.content, { cascade: true }),
    __metadata("design:type", Array)
], ProjectContent.prototype, "dates", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_collaborator_entity_1.ProjectCollaboratorEntity, (c) => c.content, { cascade: true }),
    __metadata("design:type", Array)
], ProjectContent.prototype, "collaborators", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => project_technologies_entity_1.ProjectTechnologiesEntity, (t) => t.content, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", project_technologies_entity_1.ProjectTechnologiesEntity)
], ProjectContent.prototype, "technologies", void 0);
exports.ProjectContent = ProjectContent = __decorate([
    (0, typeorm_1.Entity)()
], ProjectContent);
//# sourceMappingURL=project-content.entity.js.map